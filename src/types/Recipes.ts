import { z } from 'zod'
import { RecipeSchema } from '@/schema/RecipeSchema'
import { SortType } from '@/constants/Sort'

export type Recipe = z.infer<typeof RecipeSchema>

// Define sort direction type
export type SortDirection = keyof typeof SortType

// Define filter favorite type
export type FilterFavorite = 'ALL' | 'FAVORITE' | 'NOT_FAVORITE'

// Define state interface
export type RecipeState = {
  recipes: Recipe[]
  filteredRecipes: Recipe[]
  sortDirection: SortDirection
  filterFavorite: FilterFavorite
  searchQuery: string
}
