import type React from "react"
interface FormSectionProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

export default function FormSection({ label, required, children }: FormSectionProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-light text-amber-950">
        {label}
        {required && <span className="text-rose-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
