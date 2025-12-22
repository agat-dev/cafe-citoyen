"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type NavLink = {
  label: string
  href: string
}

export type NavItem = {
  label: string
  bgColor: string
  textColor: string
  links: NavLink[]
  isEvent?: boolean
  eventDate?: string
  eventImage?: string
  eventCategory?: string
}

export interface AnimatedNavProps {
  logo: React.ReactNode
  items: NavItem[]
  className?: string
  baseColor?: string
  menuColor?: string
  agendaLink?: string
}

export function AnimatedNav({
  logo,
  items,
  className = "",
  baseColor = "oklch(0.7 0.1 202 / 0%)",
  menuColor = "black",
  agendaLink = "/agenda",
}: AnimatedNavProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" })
    setIsExpanded(false)
  }

  const toggleCard = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    setExpandedCardIndex(expandedCardIndex === index ? null : index)
  }

  return (
    <div className={cn("w-full", className)}>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 min-h-10 backdrop-blur-md",
          baseColor,
        )}
      >
        <div className="container mx-auto max-w-full overflow-x-hidden">
          <div className="flex h-10 items-center justify-between">
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className={cn(
                "flex flex-col gap-1.5 p-2 transition-transform hover:scale-110 relative z-[110]",
                isExpanded && "gap-0",
              )}
              aria-label={isExpanded ? "Fermer le menu" : "Ouvrir le menu"}
              style={{ color: menuColor }}
            >
              <span
                className={cn(
                  "block h-0.5 w-6 bg-current transition-all duration-300",
                  isExpanded && "rotate-45 translate-y-0.5",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-current transition-all duration-300",
                  isExpanded && "-rotate-45 -translate-y-0.5",
                )}
              />
            </button>

            {/* Logo */}
            <Link href="/" onClick={handleLinkClick} className="flex items-center h-8 w-auto px-2">
              {logo}
            </Link>

            {/* Agenda Link */}
            <Link
              href={agendaLink}
              onClick={handleLinkClick}
              className="text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-sm bg-foreground text-background rounded-full px-4 py-1.5 shadow-xs relative z-[110]"
            >
              Agenda
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {/* Gradient overlay - more opaque at bottom */}
          <div className="relative backdrop-blur-md">
            {/* Decorative balls in background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {/* Ball 1 - Large Coral - Top left, partially visible */}
              <div
                className="absolute w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(25 60% 70%), hsl(25 60% 70% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "-5%",
                  left: "8%",
                  opacity: 0.65,
                }}
              />
              {/* Ball 2 - Small Blue - Top center between cards */}
              <div
                className="absolute w-16 h-16 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(240 60% 55%), hsl(240 60% 55% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "12%",
                  left: "42%",
                  opacity: 0.85,
                }}
              />
              {/* Ball 3 - Medium Yellow - Top right, mostly visible */}
              <div
                className="absolute w-32 h-32 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(90 60% 85%), hsl(90 60% 85% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "8%",
                  right: "12%",
                  opacity: 0.9,
                }}
              />
              {/* Ball 4 - Tiny Purple - Near top, subtle through card */}
              <div
                className="absolute w-12 h-12 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(300 60% 75%), hsl(300 60% 75% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "22%",
                  left: "28%",
                  opacity: 0.55,
                }}
              />
              {/* Ball 5 - Large Green - Middle left, very subtle through card */}
              <div
                className="absolute w-36 h-36 rounded-full z-20"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(150 60% 65%), hsl(150 60% 65% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "35%",
                  left: "5%",
                  opacity: 0.6,
                }}
              />
              {/* Ball 6 - Medium Blue - Center, visible in gutter */}
              <div
                className="absolute w-28 h-28 rounded-full z-20"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(240 60% 55%), hsl(240 60% 55% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "42%",
                  left: "48%",
                  opacity: 0.88,
                }}
              />
              {/* Ball 7 - Small Coral - Center right gutter */}
              <div
                className="absolute w-20 h-20 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(25 60% 70%), hsl(25 60% 70% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "38%",
                  right: "20%",
                  opacity: 0.8,
                }}
              />
              {/* Ball 8 - Large Purple - Right edge, partially off screen */}
              <div
                className="absolute w-44 h-44 rounded-full z-20"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(300 60% 75%), hsl(300 60% 75% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  top: "48%",
                  right: "-8%",
                  opacity: 0.7,
                }}
              />
              {/* Ball 9 - Tiny Green - Bottom left gutter */}
              <div
                className="absolute w-14 h-14 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(150 60% 65%), hsl(150 60% 65% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  bottom: "28%",
                  left: "33%",
                  opacity: 0.85,
                }}
              />
              {/* Ball 10 - Medium Yellow - Bottom center, subtle through card */}
              <div
                className="absolute w-26 h-26 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(90 60% 85%), hsl(90 60% 85% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  bottom: "18%",
                  left: "55%",
                  opacity: 0.6,
                }}
              />
              {/* Ball 11 - Small Blue - Bottom right gutter */}
              <div
                className="absolute w-18 h-18 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(240 60% 55%), hsl(240 60% 55% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  bottom: "25%",
                  right: "15%",
                  opacity: 0.8,
                }}
              />
              {/* Ball 12 - Large Coral - Bottom, mostly off screen, very subtle */}
              <div
                className="absolute w-48 h-48 rounded-full z-20"
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(25 60% 70%), hsl(25 60% 70% / 0.7))",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05), inset 0 -2px 10px rgba(0,0,0,0.05)",
                  bottom: "-10%",
                  left: "22%",
                  opacity: 0.55,
                }}
              />
            </div>

            {/* Matching megamenu container background with menu bar */}
            <div className="container mx-auto px-4 lg:px-8 py-4 max-w-full overflow-x-hidden max-h-[calc(100vh-2.5rem)] lg:overflow-visible relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200/30 rounded-xl overflow-hidden bg-white/95">
                {(items || []).map((item, idx) => (
                  <div
                    key={`${item.label}-${idx}`}
                    className={cn(
                      "flex flex-col transition-all duration-500 ease-out relative bg-white",
                      "border-r border-b border-gray-200/30 last:border-r-0",
                      "md:nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:nth-[3n]:border-r-0",
                      "lg:min-h-[180px]",
                      expandedCardIndex === idx ? "min-h-[180px]" : "min-h-[60px] lg:min-h-[180px]",
                      isExpanded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                      item.label === ""
                        ? "items-center justify-center p-2"
                        : expandedCardIndex === idx
                          ? "p-6"
                          : "p-3 lg:p-6",
                      "max-w-full",
                      item.isEvent && "hidden lg:flex",
                    )}
                    style={{
                      color: item.textColor,
                      transitionDelay: `${idx * 80}ms`,
                      overflow: "visible",
                    }}
                  >
                    {item.label !== "" && <></>}

                    {item.label === "" && idx === items.length - 1 ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <div className="w-full h-full flex items-center justify-center">{logo}</div>
                      </div>
                    ) : item.isEvent ? (
                      <Link
                        href={item.links?.[0]?.href || "/"}
                        onClick={handleLinkClick}
                        className="relative w-full h-full flex flex-col overflow-hidden rounded-xl group"
                      >
                        {/* Content overlay at bottom */}
                        <div className="relative z-10 mt-auto bg-white rounded-2xl p-4 m-3 shadow-sm">
                          {/* Category badge */}
                          {item.eventCategory && (
                            <div className="mb-2">
                              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                                {item.eventCategory}
                              </span>
                            </div>
                          )}

                          {/* Event title */}
                          <h3 className="font-serif text-base font-bold mb-2 line-clamp-2 group-hover:underline">
                            {item.label}
                          </h3>

                          {/* Event date */}
                          {item.eventDate && (
                            <p className="text-sm text-muted-foreground">
                              {new Date(item.eventDate).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </Link>
                    ) : (
                      <>
                        <div className="lg:hidden">
                          <button
                            onClick={(e) => toggleCard(idx, e)}
                            className="text-base font-bold mb-2 text-left w-full hover:underline underline-offset-4 transition-all relative z-10 flex items-center justify-between"
                          >
                            {item.label}
                            <svg
                              className={cn(
                                "h-5 w-5 transition-transform duration-300",
                                expandedCardIndex === idx && "rotate-180",
                              )}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                        <div className="hidden lg:block">
                          <Link
                            href={item.links?.[0]?.href || "/"}
                            onClick={handleLinkClick}
                            className="text-lg font-bold mb-4 hover:underline underline-offset-4 transition-all relative z-10"
                          >
                            {item.label}
                          </Link>
                        </div>
                        <div
                          className={cn(
                            "flex flex-col gap-3 flex-1 relative z-10 transition-all duration-300 overflow-hidden",
                            "lg:flex lg:max-h-full lg:opacity-100",
                            expandedCardIndex === idx
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100",
                          )}
                        >
                          <Link
                            href={item.links?.[0]?.href || "/"}
                            onClick={handleLinkClick}
                            className="group flex items-center gap-2 transition-all hover:translate-x-1 font-semibold lg:hidden"
                            style={{ fontSize: "16px" }}
                          >
                            <svg
                              className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {item.label}
                          </Link>
                          {item.links?.slice(1).map((lnk, i) => (
                            <Link
                              key={`${lnk.label}-${i}`}
                              href={lnk.href}
                              onClick={handleLinkClick}
                              className="group flex items-center gap-2 transition-all hover:translate-x-1"
                              style={{ fontSize: "16px" }}
                            >
                              <svg
                                className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {lnk.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
