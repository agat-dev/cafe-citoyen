"use client"

import { useEffect, useState, useRef, type ReactNode } from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundAlt?: string
  searchSection?: ReactNode // Add optional search section
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
}

export function PageHeader({ title, subtitle, backgroundImage, backgroundAlt, searchSection }: PageHeaderProps) {
  const [mounted, setMounted] = useState(false)
  const signRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-[300px] flex items-center overflow-visible bg-white">
      <style jsx>{`
        @keyframes growBall {
          0% {
            transform: scale(0.05);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .ball-animate {
          animation: growBall 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="container mx-auto px-3 md:px-6 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {backgroundImage && (
            <div className="flex-shrink-0 relative order-1 lg:order-2 w-full lg:w-auto">
              <div
                ref={signRef}
                className="relative w-full lg:w-64 h-56 md:h-64 lg:h-72 overflow-hidden"
                style={{
                  border: "1px solid oklch(0 0.1521 202 / 29.79%)",
                }}
              >
                <img
                  src={backgroundImage || "/placeholder.svg"}
                  alt={backgroundAlt || title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 border-4 border-amber-900/20 pointer-events-none rounded-3xl" />
              </div>
            </div>
          )}

          <div className="flex-1 space-y-6 order-2 lg:order-1">
            <div className="relative">
              {/* Decorative balls positioned behind title */}
              <div className="absolute -inset-8 pointer-events-none overflow-visible">
                {/* Ball 1 - Blue (chart-1) - Top left */}
                <div
                  className="absolute w-24 h-24 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(240 60% 55%), hsl(240 60% 55% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    top: "-50px",
                    left: "15%",
                    zIndex: 0,
                    animationDelay: "0.1s",
                  }}
                />
                {/* Ball 2 - Green (chart-2) - Top right */}
                <div
                  className="absolute w-20 h-20 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(150 60% 65%), hsl(150 60% 65% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    top: "-35px",
                    right: "25%",
                    zIndex: 0,
                    animationDelay: "0.2s",
                  }}
                />
                {/* Ball 3 - Coral (chart-3) - Bottom left */}
                <div
                  className="absolute w-22 h-22 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(25 60% 70%), hsl(25 60% 70% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    bottom: "-40px",
                    left: "20%",
                    zIndex: 0,
                    animationDelay: "0.3s",
                  }}
                />
                {/* Ball 4 - Purple (chart-4) - Bottom right */}
                <div
                  className="absolute w-18 h-18 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(300 60% 75%), hsl(300 60% 75% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    bottom: "-30px",
                    right: "15%",
                    zIndex: 0,
                    animationDelay: "0.4s",
                  }}
                />
                {/* Ball 5 - Yellow (chart-5) - Left */}
                <div
                  className="absolute w-16 h-16 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(90 60% 85%), hsl(90 60% 85% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    top: "-20px",
                    left: "-40px",
                    zIndex: 0,
                    animationDelay: "0.5s",
                  }}
                />
                {/* Ball 6 - Blue (chart-1) - Right top */}
                <div
                  className="absolute w-20 h-20 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(240 60% 55%), hsl(240 60% 55% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    top: "40px",
                    right: "-30px",
                    zIndex: 0,
                    animationDelay: "0.6s",
                  }}
                />
                {/* Ball 7 - Green (chart-2) - Center left */}
                <div
                  className="absolute w-14 h-14 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(150 60% 65%), hsl(150 60% 65% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    bottom: "20px",
                    left: "10%",
                    zIndex: 0,
                    animationDelay: "0.7s",
                  }}
                />
                {/* Ball 8 - Coral (chart-3) - Center */}
                <div
                  className="absolute w-18 h-18 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(25 60% 70%), hsl(25 60% 70% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    top: "10px",
                    left: "30%",
                    zIndex: 0,
                    animationDelay: "0.8s",
                  }}
                />
                {/* Ball 9 - Purple (chart-4) - Bottom center */}
                <div
                  className="absolute w-12 h-12 rounded-full shadow-sm ball-animate"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, hsl(300 60% 75%), hsl(300 60% 75% / 0.7))",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                    bottom: "-10px",
                    right: "20%",
                    zIndex: 0,
                    animationDelay: "0.9s",
                  }}
                />
              </div>

              <div
                className="relative z-10 bg-white rounded-3xl p-8 shadow-sm"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 5px 15px rgba(0,0,0,0.03)",
                }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-balance mb-4 text-black">
                  {decodeHtmlEntities(title)}
                </h1>
                {subtitle && (
                  <p className="text-lg md:text-xl text-pretty max-w-2xl text-muted-foreground">
                    {decodeHtmlEntities(subtitle)}
                  </p>
                )}
              </div>
            </div>

            {searchSection && <div className="pt-4">{searchSection}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
