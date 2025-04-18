import { sleep } from '@/helpers/sleep'
import { createRecipes } from '@/mocks/Recipes'
import { Recipe } from '@/types/Recipes'
import { useState, useEffect } from 'react'

export const useGetInitialRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function getInitialData() {
    ;(async function getData() {
      setIsLoading(true)
      await sleep(2000)
      setRecipes(createRecipes(15))
      setIsLoading(false)
    })()
  }, [])

  return {
    isLoading,
    recipes,
  }
}
