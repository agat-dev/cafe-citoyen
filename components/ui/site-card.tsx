"use client"
import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { EvervaultCard, Icon } from "./evervault-card"

interface SiteCardProps {
  title: string
  description?: string
  image?: string
  imageAlt?: string
  href?: string
  category?: string
  date?: string
  variant?: "primary" | "secondary" | "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
  className?: string
  children?: React.ReactNode
  inMegamenu?: boolean
  hideImage?: boolean // Added prop to hide image container
  hideCorners?: boolean // Ajout pour masquer les icônes d'angle
  hideLeftCorners?: boolean // Pour masquer les icônes de coin gauche
  showTopLeftCorner?: boolean
  showTopRightCorner?: boolean
  showBottomLeftCorner?: boolean
  showBottomRightCorner?: boolean
}

const variantColors = {
  primary: {
    gradient: "from-primary to-primary/80",
    button: "bg-primary shadow-primary/20 hover:shadow-primary/40",
    badge: "bg-primary/20 text-primary",
  },
  secondary: {
    gradient: "from-secondary to-secondary/80",
    button: "bg-secondary shadow-secondary/20 hover:shadow-secondary/40",
    badge: "bg-secondary/20 text-secondary",
  },
  "chart-1": {
    gradient: "from-chart-1 to-chart-1/80",
    button: "bg-chart-1 shadow-chart-1/20 hover:shadow-chart-1/40",
    badge: "bg-chart-1/20 text-chart-1",
  },
  "chart-2": {
    gradient: "from-chart-2 to-chart-2/80",
    button: "bg-chart-2 shadow-chart-2/20 hover:shadow-chart-2/40",
    badge: "bg-chart-2/20 text-chart-2",
  },
  "chart-3": {
    gradient: "from-chart-3 to-chart-3/80",
    button: "bg-chart-3 shadow-chart-3/20 hover:shadow-chart-3/40",
    badge: "bg-chart-3/20 text-chart-3",
  },
  "chart-4": {
    gradient: "from-chart-4 to-chart-4/80",
    button: "bg-chart-4 shadow-chart-4/20 hover:shadow-chart-4/40",
    badge: "bg-chart-4/20 text-chart-4",
  },
  "chart-5": {
    gradient: "from-chart-5 to-chart-5/80",
    button: "bg-chart-5 shadow-chart-5/20 hover:shadow-chart-5/40",
    badge: "bg-chart-5/20 text-chart-5",
  },
}

export function SiteCard({
  hideLeftCorners = false,
  showTopLeftCorner = true,
  showTopRightCorner = true,
  showBottomLeftCorner = true,
  showBottomRightCorner = true,
  title,
  description,
  image,
  imageAlt,
  href,
  category,
  date,
  variant = "chart-1",
  className,
  children,
  inMegamenu = false,
  hideImage = false, // Added prop to hide image container
  forceImageCover = false,
  noPadding = false,
  hideCorners = false,
}: SiteCardProps & { forceImageCover?: boolean; noPadding?: boolean; hideCorners?: boolean }) {
  const corners = [
    { show: showTopLeftCorner, className: "-top-3 -left-3" },
    { show: showBottomLeftCorner, className: "-bottom-3 -left-3" },
    { show: showTopRightCorner, className: "-top-3 -right-3" },
    { show: showBottomRightCorner, className: "-bottom-3 -right-3" },
  ];
  const isOnlyImage =
    !title && !description && !children && !category && !date && !href && !forceImageCover && !noPadding;

  if (!hideImage && isOnlyImage) {
    // Cas image seule, pas de div
    return image ? (
      <img
        src={image || "/placeholder.svg"}
        alt={imageAlt || title}
        className="w-full h-full object-cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '260px' }}
        loading="lazy"
      />
    ) : (
      <EvervaultCard text={title ? title.substring(0, 2).toUpperCase() : ""} />
    );
  }

  const CardContent = (
    <div
      className={cn(
        "relative flex flex-col h-full w-full",
        (noPadding || forceImageCover) ? "p-0" : "p-4",
        "border-r border-b border-black/[0.2] dark:border-white/[0.2]",
        "bg-white dark:bg-black text-gray-700 dark:text-gray-300",
        "transition-all duration-300",
        "group/card",
        className,
      )}
    >
      {/* Corner Icons */}
      {!hideCorners && corners.map((corner, i) =>
        corner.show ? (
          <Icon
            key={i}
            className={cn(
              "absolute h-6 w-6 dark:text-white text-black z-[5]",
              corner.className
            )}
          />
        ) : null
      )}

      {!hideImage && (
        <div
          className={cn(
            "w-full h-full aspect-[4/3] rounded-none overflow-hidden p-0 m-0"
          )}
          style={{ width: '100%', height: '100%', maxHeight: '260px' }}
        >
          {image ? (
            <img
              src={image || "/placeholder.svg"}
              alt={imageAlt || title}
              className="w-full h-full object-cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '260px' }}
              loading="lazy"
            />
          ) : (
            <EvervaultCard text={title ? title.substring(0, 2).toUpperCase() : ""} />
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="w-full">
        {/* Category/Date Badge */}
        {(category || date) && (
          <div className="flex items-center gap-4 mb-2 pt-4">{/* gap augmenté */}
            {category && (
              <span className={cn(
                "text-xs border font-light dark:border-white/[0.2] border-black/[0.2] px-2 py-0.5",
                "text-black dark:text-white"
              )}>
                {category}
              </span>
            )}
            {date && <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{date}</span>}
          </div>
        )}
        {/* Title */}
        <h5
          className={cn(
            "dark:text-white text-black text-xl md:text-2xl font-bold leading-snug tracking-normal antialiased line-clamp-2",
            inMegamenu ? "mb-4" : "mb-2",
          )}
        >
          {title}
        </h5>

        {/* Description */}
        {description && (
          <p className="dark:text-white text-black text-xs md:text-base font-light leading-relaxed antialiased line-clamp-3">
            {description}
          </p>
        )}

        {/* Children */}
        {children}
      </div>

      {/* Read More Button */}
      {href && (
        <div className="mt-4">
          <span
            className={cn(
              "text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full px-2 py-0.5",
              "text-black dark:text-white inline-block"
            )}
          >
            Lire plus
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return <div className="h-full">{CardContent}</div>;
}

// Wrapper pour créer une grille sans gouttières avec bordures partagées
interface SiteCardGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function SiteCardGrid({ children, columns = 3, className }: SiteCardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("relative", className)}>
      {/* Corner Icons pour la grille entière (sauf en bas à droite) */}
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black z-10" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black z-10" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black z-10" />
      {/* Pas d'icône en bas à droite */}
      <div
        className={cn(
          "grid border-l border-t border-black/[0.2] dark:border-white/[0.2]",
          gridCols[columns],
        )}
      >
        {children}
      </div>
    </div>
  )
}
