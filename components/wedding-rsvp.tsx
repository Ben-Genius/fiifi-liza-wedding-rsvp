"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Music, Car, Phone, Mail, Check, X } from "lucide-react"

// Interactive Card Component
function InteractiveCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {children}
    </motion.div>
  )
}

// Animated Progress Dots
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`relative ${i <= current ? 'w-4 h-4' : 'w-3 h-3'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          <div className={`rounded-full transition-all duration-500 ${
            i < current 
              ? 'bg-amber-500 shadow-lg shadow-amber-300/50' 
              : i === current
              ? 'bg-amber-400 animate-pulse'
              : 'bg-gray-200'
          }`} />
          {i < current && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="w-2 h-2 text-white" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Wax Seal Button
function WaxSealButton({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95, rotate: -2 }}
      className={`relative px-8 py-4 rounded-full font-medium text-white shadow-lg transition-all duration-300 ${
        disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-amber-600 hover:bg-amber-700 hover:shadow-xl'
      }`}
    >
      <div className="absolute inset-0 rounded-full bg-amber-800 opacity-20" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Interactive Menu Card with enhanced animations
function MenuCard({ title, emoji, description, selected, onClick }: {
  title: string; emoji: string; description: string; selected: boolean; onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
        selected 
          ? 'border-amber-400 bg-amber-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-amber-200 hover:shadow-md'
      }`}
    >
      {/* Animated background effect */}
      {selected && (
        <motion.div
          className="absolute inset-0 bg-amber-100"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Floating emoji */}
      <motion.div 
        className="text-4xl mb-3 text-center relative z-10"
        animate={selected ? {
          y: [0, -5, 0],
          rotate: [0, 10, -10, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {emoji}
      </motion.div>
      
      <h3 className="font-medium text-gray-900 text-center mb-2 relative z-10">{title}</h3>
      <p className="text-sm text-gray-600 text-center relative z-10">{description}</p>
      
      {/* Selection indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center z-20"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
      
      {/* Sparkle effect on selection */}
      {selected && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-400 text-xs"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}

export default function WeddingRSVP() {
  const [currentStep, setCurrentStep] = useState(0)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number}>>([])
  const [formData, setFormData] = useState({
    attending: "",
    guestName: "",
    plusOneName: "",
    appetizer: "",
    entree: "",
    dessert: "",
    shuttle: false,
    dietary: "",
    songRequest: "",
    phone: "",
    email: ""
  })

  const steps = ["Welcome", "Attendance", "Details", "Menu", "Contact", "Confirmation"]

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Create floating hearts on click
  const createHeart = (e: React.MouseEvent) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    }
    setHearts(prev => [...prev, newHeart])
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
    }, 2000)
  }

  useEffect(() => {
    if (envelopeOpen && currentStep === 0) {
      setTimeout(() => setCurrentStep(1), 1200)
    }
  }, [envelopeOpen, currentStep])

  const handleSubmit = () => {
    // Confetti effect
    const colors = ['#D4A017', '#F5F0E6', '#0B1D38', '#29423C']
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: fall 3s linear forwards;
      `
      document.body.appendChild(confetti)
      setTimeout(() => document.body.removeChild(confetti), 3000)
    }
    setCurrentStep(5)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" onClick={createHeart}>
      {/* Cursor trail effect */}
      <motion.div
        className="fixed w-4 h-4 bg-rose-300 rounded-full pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      
      {/* Floating hearts from clicks */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="fixed text-2xl pointer-events-none z-40"
          initial={{ 
            x: heart.x, 
            y: heart.y, 
            scale: 0,
            rotate: 0 
          }}
          animate={{ 
            y: heart.y - 100, 
            scale: [0, 1.2, 0],
            rotate: 360,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          💖
        </motion.div>
      ))}

      {/* Minimal floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-200 text-2xl"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 2
            }}
            style={{
              left: `${(i * 15 + 10) % 90}%`,
              top: `${(i * 20 + 5) % 90}%`
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Minimal Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-playfair text-gray-900 mb-4">Fiifi & Liza</h1>
          <div className="w-12 h-px bg-amber-400 mx-auto mb-4" />
          <p className="text-gray-600 text-sm tracking-wide">
            Wedding RSVP
          </p>
        </motion.div>

        {/* Step Progress */}
        {currentStep > 0 && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < currentStep - 1 ? 'bg-amber-400' : i === currentStep - 1 ? 'bg-amber-300' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Interactive Envelope Scene */}
        {currentStep === 0 && (
          <motion.div 
            className="flex items-center justify-center mb-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <motion.div 
              className="relative w-80 h-52 cursor-pointer group"
              onClick={() => setEnvelopeOpen(true)}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              animate={envelopeOpen ? {} : {
                rotate: [0, -2, 2, -1, 1, 0],
                transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }
              }}
              style={{ perspective: '1000px' }}
            >
              {/* Envelope Base with gradient border animation */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-lg shadow-lg border-2"
                animate={{
                  borderColor: ["#e5e7eb", "#f59e0b", "#e5e7eb"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-300 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-300 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-amber-300 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-amber-300 rounded-br-lg" />
              
              {/* Envelope Flap with 3D effect */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-28 bg-amber-50 rounded-t-lg origin-bottom border-b border-amber-200"
                animate={{ 
                  rotateX: envelopeOpen ? -60 : 0,
                  transformOrigin: "bottom"
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transformStyle: 'preserve-3d' }}
              />
              
              {/* Interactive Wax Seal */}
              <motion.div 
                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-500 rounded-full shadow-lg border-4 border-amber-600 flex items-center justify-center group-hover:bg-amber-400 transition-colors"
                whileHover={{ 
                  rotate: [0, -10, 10, -5, 5, 0],
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
                animate={!envelopeOpen ? {
                  boxShadow: [
                    "0 4px 6px rgba(245, 158, 11, 0.3)",
                    "0 8px 15px rgba(245, 158, 11, 0.5)",
                    "0 4px 6px rgba(245, 158, 11, 0.3)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.div>
              
              {/* Sparkle effects around envelope */}
              {!envelopeOpen && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-amber-400 text-lg"
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        repeatDelay: 1
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + (i % 2) * 70}%`
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
              
              {/* Inner Content */}
              {envelopeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div 
                    className="text-3xl font-playfair text-gray-900 mb-2"
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(245, 158, 11, 0)",
                        "0 0 10px rgba(245, 158, 11, 0.5)",
                        "0 0 0px rgba(245, 158, 11, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Fiifi & Liza
                  </motion.div>
                  <motion.div 
                    className="text-sm text-gray-600"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    You're invited to our wedding!
                  </motion.div>
                </motion.div>
              )}
              
              {/* Hover instruction */}
              {!envelopeOpen && (
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open ✉️
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <InteractiveCard delay={0.2}>
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-20 h-20 text-rose-400 mx-auto mb-8" />
                </motion.div>
                
                <h2 className="text-4xl font-playfair text-gray-900 mb-12">Will you join Fiifi & Liza's celebration?</h2>
                
                <div className="flex justify-center gap-8 mb-12">
                  <motion.div
                    onClick={() => setFormData(prev => ({ ...prev, attending: "yes" }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-8 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                      formData.attending === "yes" 
                        ? 'border-green-400 bg-green-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-green-200'
                    }`}
                  >
                    <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <div className="text-lg font-medium text-green-700">Yes, I'll be there!</div>
                  </motion.div>
                  
                  <motion.div
                    onClick={() => setFormData(prev => ({ ...prev, attending: "no" }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-8 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                      formData.attending === "no" 
                        ? 'border-red-400 bg-red-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-red-200'
                    }`}
                  >
                    <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <div className="text-lg font-medium text-red-700">Sorry, can't make it</div>
                  </motion.div>
                </div>

                <WaxSealButton 
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.attending}
                >
                  Continue ✨
                </WaxSealButton>
              </div>
            </InteractiveCard>
          )}

          {currentStep === 2 && (
            <InteractiveCard delay={0.2}>
              <h2 className="text-3xl font-playfair text-gray-900 mb-8 text-center">Guest Details</h2>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <Label className="text-gray-700 font-medium">Your Name</Label>
                  <motion.div className="relative">
                    <Input
                      value={formData.guestName}
                      onChange={(e) => setFormData(prev => ({ ...prev, guestName: e.target.value }))}
                      className="mt-2 border border-gray-200 focus:border-amber-400 bg-white rounded-lg p-3 pr-10"
                      placeholder="Enter your full name"
                    />
                    {formData.guestName && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <Label className="text-gray-700 font-medium">Plus One (Optional)</Label>
                  <motion.div className="relative">
                    <Input
                      value={formData.plusOneName}
                      onChange={(e) => setFormData(prev => ({ ...prev, plusOneName: e.target.value }))}
                      className="mt-2 border border-gray-200 focus:border-amber-400 bg-white rounded-lg p-3 pr-10"
                      placeholder="Guest name"
                    />
                    {formData.plusOneName && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="px-8 py-3">
                  Back
                </Button>
                <WaxSealButton 
                  onClick={() => setCurrentStep(3)}
                  disabled={!formData.guestName}
                >
                  Next Step
                </WaxSealButton>
              </div>
            </InteractiveCard>
          )}

          {currentStep === 3 && (
            <InteractiveCard delay={0.2}>
              <h2 className="text-4xl font-playfair text-amber-900 mb-12 text-center">Choose Your Menu</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-amber-800 mb-4">Appetizer</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <MenuCard
                      title="Sea Bass Ceviche"
                      emoji="🐟"
                      description="Fresh citrus-cured fish"
                      selected={formData.appetizer === "sea-bass"}
                      onClick={() => setFormData(prev => ({ ...prev, appetizer: "sea-bass" }))}
                    />
                    <MenuCard
                      title="Tomato Bruschetta"
                      emoji="🍅"
                      description="Heirloom tomatoes on toast"
                      selected={formData.appetizer === "bruschetta"}
                      onClick={() => setFormData(prev => ({ ...prev, appetizer: "bruschetta" }))}
                    />
                    <MenuCard
                      title="Fresh Oysters"
                      emoji="🦪"
                      description="Local oysters on ice"
                      selected={formData.appetizer === "oysters"}
                      onClick={() => setFormData(prev => ({ ...prev, appetizer: "oysters" }))}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-amber-800 mb-4">Main Course</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <MenuCard
                      title="Herb-Crusted Salmon"
                      emoji="🐟"
                      description="Atlantic salmon with herbs"
                      selected={formData.entree === "salmon"}
                      onClick={() => setFormData(prev => ({ ...prev, entree: "salmon" }))}
                    />
                    <MenuCard
                      title="Beef Tenderloin"
                      emoji="🥩"
                      description="Prime cut with red wine jus"
                      selected={formData.entree === "beef"}
                      onClick={() => setFormData(prev => ({ ...prev, entree: "beef" }))}
                    />
                    <MenuCard
                      title="Vegetable Wellington"
                      emoji="🥬"
                      description="Roasted vegetables in pastry"
                      selected={formData.entree === "vegetarian"}
                      onClick={() => setFormData(prev => ({ ...prev, entree: "vegetarian" }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-12">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="px-8 py-3">
                  Back
                </Button>
                <WaxSealButton onClick={() => setCurrentStep(4)}>
                  Continue
                </WaxSealButton>
              </div>
            </InteractiveCard>
          )}

          {currentStep === 4 && (
            <InteractiveCard delay={0.2}>
              <h2 className="text-3xl font-playfair text-gray-900 mb-8 text-center">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label className="text-gray-700 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-2 border border-gray-200 focus:border-amber-400 bg-white rounded-lg p-3"
                    placeholder="Your phone number"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label className="text-gray-700 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-2 border border-gray-200 focus:border-amber-400 bg-white rounded-lg p-3"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label className="text-gray-700 font-medium flex items-center gap-2">
                    <Music className="w-4 h-4" /> Song Request (Optional)
                  </Label>
                  <Input
                    value={formData.songRequest}
                    onChange={(e) => setFormData(prev => ({ ...prev, songRequest: e.target.value }))}
                    className="mt-2 border border-gray-200 focus:border-amber-400 bg-white rounded-lg p-3"
                    placeholder="Request a song for Fiifi & Liza's celebration"
                  />
                </motion.div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(3)} className="px-8 py-3">
                  Back
                </Button>
                <WaxSealButton onClick={handleSubmit}>
                  Submit RSVP
                </WaxSealButton>
              </div>
            </InteractiveCard>
          )}

          {currentStep === 5 && (
            <InteractiveCard delay={0.2}>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <Heart className="w-20 h-20 text-rose-400 mx-auto mb-6" />
                </motion.div>
                
                <h2 className="text-4xl font-playfair text-gray-900 mb-6">Thank You!</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                  <p className="text-lg text-gray-800 mb-2">
                    Your RSVP has been received
                  </p>
                  <p className="text-gray-600">
                    We can't wait to celebrate with you!
                  </p>
                </div>
                
                <div className="text-4xl">🎉</div>
              </div>
            </InteractiveCard>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
