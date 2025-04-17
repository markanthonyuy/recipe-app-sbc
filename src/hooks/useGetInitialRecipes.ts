import { createRecipes } from '@/helpers/SampleRecipes'
import { Recipe } from '@/types/Recipes'
import { useState, useEffect } from 'react'

export const useGetInitialRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    setRecipes(createRecipes(15))
  }, [])

  return {
    recipes,
  }
}
