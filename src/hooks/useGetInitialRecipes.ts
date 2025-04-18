import { createRecipes } from '@/mocks/Recipes'
import { Recipe } from '@/types/Recipes'
import { useState, useEffect } from 'react'

export const useGetInitialRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)

  useEffect(() => {
    setRecipes(createRecipes(15))
  }, [])

  return {
    recipes,
  }
}
