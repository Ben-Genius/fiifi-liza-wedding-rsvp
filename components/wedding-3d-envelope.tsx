"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface Wedding3DEnvelopeProps {
  onOpen: () => void
}

export default function Wedding3DEnvelope({ onOpen }: Wedding3DEnvelopeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const envelopeRef = useRef<THREE.Group | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const isAnimatingRef = useRef(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xfaf8f3)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0xfaf8f3, 1)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4)
    backLight.position.set(-5, -5, -5)
    scene.add(backLight)

    // Create envelope group
    const envelope = new THREE.Group()
    envelopeRef.current = envelope
    scene.add(envelope)

    // Envelope body (front)
    const bodyGeometry = new THREE.BoxGeometry(2, 1.2, 0.1)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5ede4,
      roughness: 0.6,
      metalness: 0.1,
      transparent: true,
    })
    const envelopeBody = new THREE.Mesh(bodyGeometry, bodyMaterial)
    envelopeBody.castShadow = true
    envelopeBody.receiveShadow = true
    envelope.add(envelopeBody)

    // Envelope flap
    const flapGeometry = new THREE.BoxGeometry(2, 0.6, 0.08)
    const flapMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0e6d8,
      roughness: 0.7,
      metalness: 0.05,
      transparent: true,
    })
    const flap = new THREE.Mesh(flapGeometry, flapMaterial)
    flap.position.z = 0.09
    flap.position.y = 0.35
    flap.castShadow = true
    envelope.add(flap)

    // Wax seal
    const sealGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 32)
    const sealMaterial = new THREE.MeshStandardMaterial({
      color: 0xc41e3a,
      roughness: 0.3,
      metalness: 0.6,
      emissive: 0x4a0f15,
      transparent: true,
    })
    const waxSeal = new THREE.Mesh(sealGeometry, sealMaterial)
    waxSeal.position.set(0, -0.15, 0.2)
    waxSeal.castShadow = true
    waxSeal.receiveShadow = true
    envelope.add(waxSeal)

    // Animation variables
    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX = (event.clientX - rect.left) / rect.width - 0.5
      mouseY = (event.clientY - rect.top) / rect.height - 0.5
    }

    const onMouseLeave = () => {
      mouseX = 0
      mouseY = 0
    }

    containerRef.current.addEventListener("mousemove", onMouseMove)
    containerRef.current.addEventListener("mouseleave", onMouseLeave)

    // Handle click to open
    const onEnvelopeClick = () => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true

      const startRotation = { x: envelope.rotation.x, y: envelope.rotation.y }
      const startPosition = { y: envelope.position.y }
      const duration = 800 // ms

      const startTime = Date.now()

      const animateOpening = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Rotate flap up (around x-axis)
        flap.rotation.x = progress * Math.PI * 0.7

        const opacityValue = 1 - progress * 0.5
        ;(envelopeBody.material as THREE.MeshStandardMaterial).opacity = opacityValue
        ;(flap.material as THREE.MeshStandardMaterial).opacity = opacityValue
        ;(waxSeal.material as THREE.MeshStandardMaterial).opacity = opacityValue

        // Fade out envelope and make it rise
        envelope.position.y = startPosition.y + progress * 0.5

        if (progress < 1) {
          animationIdRef.current = requestAnimationFrame(animateOpening)
        } else {
          onOpen()
        }
      }

      animationIdRef.current = requestAnimationFrame(animateOpening)
    }

    containerRef.current.addEventListener("click", onEnvelopeClick)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Gentle floating animation
      if (!isAnimatingRef.current) {
        envelope.rotation.x = mouseY * 0.3
        envelope.rotation.y = mouseX * 0.3
        envelope.position.y = Math.sin(Date.now() * 0.0005) * 0.1
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [onOpen])

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "linear-gradient(135deg, #faf8f3 0%, #f5f1eb 100%)",
      }}
    >
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm text-amber-900/40 font-light tracking-widest uppercase">Click to open</p>
        </div>
      )}
    </div>
  )
}
