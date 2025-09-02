"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface TerminalOutputProps {
  children: React.ReactNode
  delay?: number
}

export function TerminalOutput({ children, delay = 0 }: TerminalOutputProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      {children}
    </div>
  )
}
