"use client"

import { useState } from "react"

interface TeamMemberCardProps {
  id: number
  name: string
  role: string
  imageUrl: string
}

export default function TeamMemberCard({ name, role }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2))"
          : "rgba(20, 20, 20, 0.8)",
        border: isHovered ? "2px solid rgba(236, 72, 153, 0.6)" : "2px solid rgba(60, 60, 60, 0.4)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8 h-full flex flex-col justify-center items-center text-center min-h-[320px]">
        <h3
          className="text-3xl font-bold mb-3 transition-all duration-300"
          style={{
            background: "linear-gradient(to right, #ec4899, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: isHovered ? "scale(1.15)" : "scale(1)",
            filter: isHovered ? "drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))" : "none",
          }}
        >
          {name}
        </h3>
        <p
          className="text-pink-400 text-lg font-medium transition-all duration-300"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          {role}
        </p>
      </div>
    </div>
  )
}
