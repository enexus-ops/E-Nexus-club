"use client"

import { useRef } from "react"
import TeamMemberCard from "@/components/team-member-card"
import { TEAM_MEMBERS } from "@/lib/constants"

export default function TeamsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -window.innerWidth * 0.8,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: window.innerWidth * 0.8,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <div className="container mx-auto flex flex-col flex-grow w-full">
        <header className="text-center my-12 md:my-16 px-4">
          <h1
            className="text-4xl md:text-6xl font-bold pb-2"
            style={{
              background: "linear-gradient(to right, #ec4899, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Team
          </h1>
          <p className="mt-2 text-lg text-slate-400">Meet the brilliant minds driving our vision forward.</p>
        </header>

        <main className="flex-grow flex flex-col justify-center w-full relative">
          <div
            className="absolute top-0 left-0 w-16 h-full z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #000000, transparent)",
            }}
          ></div>
          <div
            className="absolute top-0 right-0 w-16 h-full z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #000000, transparent)",
            }}
          ></div>

          <button
            onClick={scrollLeft}
            className="absolute left-0 md:left-4 top-1/2 z-20 p-3 rounded-full transition-all duration-300 bg-black/30 text-white/70 hover:bg-pink-500/50 hover:text-white"
            style={{
              transform: "translateY(-50%)",
            }}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 md:right-4 top-1/2 z-20 p-3 rounded-full transition-all duration-300 bg-black/30 text-white/70 hover:bg-pink-500/50 hover:text-white"
            style={{
              transform: "translateY(-50%)",
            }}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 px-8 py-12 scroll-smooth scrollbar-hide"
          >
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.id} {...member} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
