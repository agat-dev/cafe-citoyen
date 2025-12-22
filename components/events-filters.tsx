"use client"

import { useState, useRef, useMemo } from "react"
import { ChevronDown } from "lucide-react"

interface EventsFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onSeasonChange: (season: string) => void
  onPartnerChange: (partner: string) => void
  categories: string[]
  seasons: string[]
  partners: string[]
  events: Array<{
    id: number
    title: { rendered: string }
    acf?: {
      partenaires_details?: Array<{ title: string }>
    }
    _embedded?: {
      "wp:term"?: Array<Array<{ name: string; taxonomy: string }>>
    }
  }>
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  id,
  disabledOptions = [],
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  id: string
  disabledOptions?: string[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 bg-white rounded-full border-2 border-muted/50 hover:border-primary/30 focus:border-primary focus:outline-none transition-all cursor-pointer flex items-center justify-between gap-3 shadow-sm hover:shadow-md text-left group"
      >
        <span className={`text-sm ${value ? "text-foreground" : "text-muted-foreground"}`}>{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground group-hover:text-primary transition-all ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl border-2 border-muted/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-64 overflow-y-auto p-2">
              <button
                onClick={() => {
                  onChange("")
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2.5 text-sm text-left rounded-xl hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
              >
                {placeholder}
              </button>
              {options.map((option) => {
                const isDisabled = disabledOptions.includes(option)
                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (!isDisabled) {
                        onChange(option)
                        setIsOpen(false)
                      }
                    }}
                    disabled={isDisabled}
                    className={`w-full px-4 py-2.5 text-sm text-left rounded-xl transition-colors ${
                      value === option
                        ? "bg-primary text-white font-medium"
                        : isDisabled
                          ? "text-muted-foreground/40 cursor-not-allowed"
                          : "hover:bg-primary/5 text-foreground hover:text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function EventsFilters({
  onSearchChange,
  onCategoryChange,
  onSeasonChange,
  onPartnerChange,
  categories,
  seasons,
  partners,
  events,
}: EventsFiltersProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSeason, setSelectedSeason] = useState("")
  const [selectedPartner, setSelectedPartner] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const { availableCategories, availableSeasons, availablePartners } = useMemo(() => {
    let eventsForCategories = [...events]
    if (selectedSeason) {
      eventsForCategories = eventsForCategories.filter((event) =>
        event._embedded?.["wp:term"]
          ?.flat()
          .some((term) => term.taxonomy === "saison-culturelle" && term.name === selectedSeason),
      )
    }
    if (selectedPartner) {
      eventsForCategories = eventsForCategories.filter((event) =>
        event.acf?.partenaires_details?.some((p) => p.title === selectedPartner),
      )
    }
    const availableCategories = new Set<string>()
    eventsForCategories.forEach((event) => {
      event._embedded?.["wp:term"]?.flat().forEach((term) => {
        if (term.taxonomy === "category") {
          availableCategories.add(term.name)
        }
      })
    })

    let eventsForSeasons = [...events]
    if (selectedCategory) {
      eventsForSeasons = eventsForSeasons.filter((event) =>
        event._embedded?.["wp:term"]
          ?.flat()
          .some((term) => term.taxonomy === "category" && term.name === selectedCategory),
      )
    }
    if (selectedPartner) {
      eventsForSeasons = eventsForSeasons.filter((event) =>
        event.acf?.partenaires_details?.some((p) => p.title === selectedPartner),
      )
    }
    const availableSeasons = new Set<string>()
    eventsForSeasons.forEach((event) => {
      event._embedded?.["wp:term"]?.flat().forEach((term) => {
        if (term.taxonomy === "saison-culturelle") {
          availableSeasons.add(term.name)
        }
      })
    })

    let eventsForPartners = [...events]
    if (selectedCategory) {
      eventsForPartners = eventsForPartners.filter((event) =>
        event._embedded?.["wp:term"]
          ?.flat()
          .some((term) => term.taxonomy === "category" && term.name === selectedCategory),
      )
    }
    if (selectedSeason) {
      eventsForPartners = eventsForPartners.filter((event) =>
        event._embedded?.["wp:term"]
          ?.flat()
          .some((term) => term.taxonomy === "saison-culturelle" && term.name === selectedSeason),
      )
    }
    const availablePartners = new Set<string>()
    eventsForPartners.forEach((event) => {
      event.acf?.partenaires_details?.forEach((partner) => {
        availablePartners.add(partner.title)
      })
    })

    return {
      availableCategories,
      availableSeasons,
      availablePartners,
    }
  }, [events, selectedCategory, selectedSeason, selectedPartner])

  const disabledCategories = categories.filter((cat) => !availableCategories.has(cat))
  const disabledSeasons = seasons.filter((season) => !availableSeasons.has(season))
  const disabledPartners = partners.filter((partner) => !availablePartners.has(partner))

  const scrollToSearchEngine = () => {
    if (containerRef.current) {
      const elementTop = containerRef.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementTop, behavior: "smooth" })
    }
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
    scrollToSearchEngine()
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onCategoryChange(value)
    scrollToSearchEngine()
  }

  const handleSeasonChange = (value: string) => {
    setSelectedSeason(value)
    onSeasonChange(value)
    scrollToSearchEngine()
  }

  const handlePartnerChange = (value: string) => {
    setSelectedPartner(value)
    onPartnerChange(value)
    scrollToSearchEngine()
  }

  const clearAllFilters = () => {
    setSearch("")
    setSelectedCategory("")
    setSelectedSeason("")
    setSelectedPartner("")
    onSearchChange("")
    onCategoryChange("")
    onSeasonChange("")
    onPartnerChange("")
    scrollToSearchEngine()
  }

  const activeFiltersCount = [selectedCategory, selectedSeason, selectedPartner].filter(Boolean).length

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Rechercher un événement..."
          className="w-full pl-14 pr-14 py-4 bg-white rounded-full border-2 border-muted/50 focus:border-primary focus:bg-white focus:outline-none transition-all text-base placeholder:text-muted-foreground shadow-md"
        />
        {search && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted/50 rounded-full"
            aria-label="Effacer la recherche"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
        )}
      </div>

      {/* Filters Toggle Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 border-2 border-primary/20 hover:border-primary/30 transition-all font-medium text-primary"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="text-sm font-semibold">Filtres avancés</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-2.5 py-1 text-xs bg-primary text-white rounded-full font-bold shadow-sm">
              {activeFiltersCount}
            </span>
          )}
          <svg
            className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Réinitialiser
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-serif font-semibold mb-3 text-foreground">
              Catégorie
            </label>
            <CustomSelect
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categories}
              placeholder="Toutes les catégories"
              disabledOptions={disabledCategories}
            />
          </div>

          {/* Season Filter */}
          <div>
            <label htmlFor="season" className="block text-sm font-serif font-semibold mb-3 text-foreground">
              Saison culturelle
            </label>
            <CustomSelect
              id="season"
              value={selectedSeason}
              onChange={handleSeasonChange}
              options={seasons}
              placeholder="Toutes les saisons"
              disabledOptions={disabledSeasons}
            />
          </div>

          {/* Partner Filter */}
          <div>
            <label htmlFor="partner" className="block text-sm font-serif font-semibold mb-3 text-foreground">
              Partenaire
            </label>
            <CustomSelect
              id="partner"
              value={selectedPartner}
              onChange={handlePartnerChange}
              options={partners}
              placeholder="Tous les partenaires"
              disabledOptions={disabledPartners}
            />
          </div>
        </div>
      )}
    </div>
  )
}
