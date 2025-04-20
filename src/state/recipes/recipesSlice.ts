import {
  FilterFavorite,
  Recipe,
  RecipeState,
  SortDirection,
} from '@/types/Recipes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import INITIAL_RECIPES_DATA from '../../../public/initial-recipes.json'

const initialState: RecipeState = {
  // @ts-expect-error
  recipes: INITIAL_RECIPES_DATA,
  filteredRecipes: [],
  sortDirection: 'ASC',
  filterFavorite: 'ALL',
  searchQuery: '',
}

const recipesSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload)
      applyFilters(state)
    },
    remove: (state, action: PayloadAction<string>) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload
      )
      if (index !== -1) {
        state.recipes.splice(index, 1)
        applyFilters(state)
      }
    },
    edit: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      )
      if (index !== -1) {
        state.recipes[index] = action.payload
        applyFilters(state)
      }
    },
    toggleIsFavorite: (state, action: PayloadAction<string>) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload
      )
      if (index !== -1) {
        state.recipes[index].isFavorite = !state.recipes[index].isFavorite
        applyFilters(state)
      }
    },
    sort: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload
      applyFilters(state)
    },
    filterIsFavorite: (state, action: PayloadAction<FilterFavorite>) => {
      state.filterFavorite = action.payload
      applyFilters(state)
    },
    search: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      applyFilters(state)
    },
  },
})

// Helper function to apply all filters
const applyFilters = (state: RecipeState) => {
  // Start with all recipes
  let filtered = [...state.recipes]

  // Apply favorite filter
  if (state.filterFavorite === 'FAVORITE') {
    filtered = filtered.filter((recipe) => recipe.isFavorite === true)
  } else if (state.filterFavorite === 'NOT_FAVORITE') {
    filtered = filtered.filter((recipe) => recipe.isFavorite === false)
  }

  // Apply search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        (recipe.instructions &&
          recipe.instructions.toLowerCase().includes(query)) ||
        (recipe.name && recipe.name.toLowerCase().includes(query))
    )
  }

  // Apply sorting
  filtered.sort((a, b) => {
    if (state.sortDirection === 'ASC') {
      return a.title.localeCompare(b.title)
    } else {
      return b.title.localeCompare(a.title)
    }
  })

  // Update filtered recipes
  state.filteredRecipes = filtered
}

// Initialize filtered recipes
applyFilters(initialState)

export const {
  add,
  edit,
  toggleIsFavorite,
  remove,
  sort,
  filterIsFavorite,
  search,
} = recipesSlice.actions

export default recipesSlice.reducer
