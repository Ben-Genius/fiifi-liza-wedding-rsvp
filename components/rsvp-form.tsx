"use client"

import type React from "react"

import { useState } from "react"
import FormSection from "./form-section"
import CrystalButton from "./crystal-button"

interface RSVPFormProps {
  onClose: () => void
}

export default function RSVPForm({ onClose }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guestCount: "1",
    dietaryRestrictions: "",
    attending: "yes",
    song: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("RSVP Submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-12 max-w-md text-center border border-amber-200/50 shadow-2xl">
          <h2 className="text-3xl font-light text-amber-950 mb-4">Thank You!</h2>
          <p className="text-amber-900/70 mb-6 font-light">
            Your RSVP has been received. We look forward to celebrating with you.
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span
              className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-xl border border-amber-100/50">
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest text-amber-900/60 uppercase font-light mb-3">
            We would love to celebrate with you
          </p>
          <h2 className="text-4xl font-light text-amber-950 mb-2">Please RSVP</h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <FormSection label="Full Name" required>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 placeholder-amber-900/30 font-light"
              placeholder="Your full name"
            />
          </FormSection>

          {/* Email */}
          <FormSection label="Email Address" required>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 placeholder-amber-900/30 font-light"
              placeholder="your@email.com"
            />
          </FormSection>

          {/* Phone */}
          <FormSection label="Phone Number">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 placeholder-amber-900/30 font-light"
              placeholder="(555) 000-0000"
            />
          </FormSection>

          {/* Attendance */}
          <FormSection label="Will you be attending?" required>
            <div className="flex gap-4">
              {["yes", "no", "maybe"].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="attending"
                    value={option}
                    checked={formData.attending === option}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-400 border-amber-200 focus:ring-rose-300 accent-rose-400"
                  />
                  <span className="text-amber-950 capitalize font-light group-hover:text-rose-400 transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </FormSection>

          {/* Guest Count */}
          <FormSection label="Number of Guests" required>
            <select
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 font-light"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </FormSection>

          {/* Dietary Restrictions */}
          <FormSection label="Dietary Restrictions">
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 placeholder-amber-900/30 font-light"
              placeholder="e.g., vegetarian, gluten-free"
            />
          </FormSection>

          {/* Song Request */}
          <FormSection label="Song Request">
            <input
              type="text"
              name="song"
              value={formData.song}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 placeholder-amber-900/30 font-light"
              placeholder="Your favorite song for the reception"
            />
          </FormSection>

          {/* Message */}
          <FormSection label="Message to the Couple">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:bg-white transition-all duration-300 text-amber-950 placeholder-amber-900/30 font-light resize-none"
              placeholder="Share your wishes and blessings..."
            />
          </FormSection>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 text-amber-900 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors duration-300 font-light"
            >
              Back
            </button>
            <CrystalButton type="submit">Submit RSVP</CrystalButton>
          </div>
        </form>
      </div>
    </div>
  )
}
