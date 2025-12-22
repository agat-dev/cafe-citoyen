// Map category names to specific color variants to ensure unique and distinct colors
const CATEGORY_COLOR_MAP: Record<
  string,
  "primary" | "secondary" | "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
> = {}

// Available colors in order of visual distinction
const AVAILABLE_VARIANTS: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | "primary" | "secondary")[] = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "primary",
  "secondary",
]

let nextColorIndex = 0

export function getCategoryVariant(
  categoryName?: string,
): "primary" | "secondary" | "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" {
  if (!categoryName) return "chart-1"

  // Normalize category name (lowercase and trim)
  const normalizedCategory = categoryName.toLowerCase().trim()

  // If category already has a color assigned, return it
  if (CATEGORY_COLOR_MAP[normalizedCategory]) {
    return CATEGORY_COLOR_MAP[normalizedCategory]
  }

  // Assign the next available color to this new category
  const assignedColor = AVAILABLE_VARIANTS[nextColorIndex % AVAILABLE_VARIANTS.length]
  CATEGORY_COLOR_MAP[normalizedCategory] = assignedColor
  nextColorIndex++

  console.log(`[v0] Assigned color "${assignedColor}" to category "${categoryName}"`)

  return assignedColor
}

// Optional: Function to get all category-color mappings for debugging
export function getCategoryColorMappings() {
  return { ...CATEGORY_COLOR_MAP }
}
