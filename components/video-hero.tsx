"use client"

import { useEffect, useRef } from "react"

interface VideoHeroProps {
  videoSrc: string
}

export function VideoHero({ videoSrc }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      console.log("[v0] Attempting to load video from:", videoSrc)
      videoRef.current.play().catch((error) => {
        console.log("[v0] Autoplay prevented:", error.message)
      })
    }
  }, [videoSrc])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black -mt-10">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </section>
  )
}
