"use client"

import type React from "react"

interface CrystalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export default function CrystalButton({ children, onClick, type = "button", disabled = false }: CrystalButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="relative px-8 py-3 font-light text-white rounded-lg transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #f8d7da 0%, #f5c6cb 50%, #f8d7da 100%)",
        boxShadow:
          "0 8px 32px rgba(196, 30, 58, 0.2), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Glass shine effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ pointerEvents: "none" }}
      />

      {/* Text */}
      <span className="relative z-10 text-amber-950 font-semibold tracking-wide block">{children}</span>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl -z-10"
        style={{ background: "linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)" }}
      />
    </button>
  )
}
