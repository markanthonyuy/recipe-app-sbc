import { Recipe } from '@/types/Recipes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import INITIAL_RECIPES_DATA from '../../../public/initial-recipes.json'

// @ts-expect-error data comes from JSON file
const initialState: Recipe[] = INITIAL_RECIPES_DATA

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Recipe>) => {
      state.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((recipe) => recipe.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    edit: (state, action: PayloadAction<Recipe>) => {
      const index = state.findIndex((recipe) => recipe.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    toggleIsFavorite: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((recipe) => recipe.id === action.payload)
      if (index !== -1) {
        state[index].isFavorite = !state[index].isFavorite
      }
    },
  },
})

export const { add, edit, toggleIsFavorite, remove } = recipesSlice.actions

export default recipesSlice.reducer
