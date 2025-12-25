"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface PageLoaderProps {
  logoUrl?: string
  logoAlt?: string
}

export function PageLoader({ logoUrl, logoAlt = "Logo" }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname]) // Déclencher l'effet à chaque changement de pathname

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "auto" : "none",
      }}
    >
      <div
        className="relative h-24 w-24 animate-pulse"
        style={{
          animation: "logoIntro 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {logoUrl ? (
          <Image
            src={logoUrl || "/placeholder.svg"}
            alt={logoAlt}
            fill
            className="object-contain"
            sizes="96px"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded border-4 border-primary">
            <svg className="h-16 w-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes logoIntro {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
