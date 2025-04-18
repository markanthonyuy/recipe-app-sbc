import { SortType } from '@/constants/Sort'
import { useGetInitialRecipes } from '@/hooks/useGetInitialRecipes'
import { Recipe } from '@/types/Recipes'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

const Recipes = {
  sortByTitle: 'ASC',
  setSortByTitle: (sort: keyof typeof SortType) => {},
  favorite: null,
  setFavorite: (favorite: boolean | null) => {},
  filterString: '',
  setFilterString: (filterString: string) => {},
  data: {
    isLoading: false,
    recipes: [],
  },
}

export const RecipesContext = createContext<
  | (typeof Recipes & {
      favorite: boolean | null
      data: {
        isLoading: boolean
        recipes: Recipe[]
      }
    })
  | null
>(null)

export const RecipesProvider = ({ children }: PropsWithChildren) => {
  const [sortByTitle, setSortByTitle] = useState<keyof typeof SortType>('ASC')
  const [favorite, setFavorite] = useState<boolean | null>(null)
  const [filterString, setFilterString] = useState('')
  const initial = useGetInitialRecipes()

  const recipes = useMemo(() => {
    let recipes = null

    if (!initial.recipes) {
      return recipes
    }

    // Handle sort
    if (sortByTitle === 'ASC') {
      recipes = initial.recipes.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
    } else {
      recipes = initial.recipes.sort((a, b) => {
        return b.title.localeCompare(a.title)
      })
    }

    // Handle search
    if (filterString?.length) {
      recipes = recipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(filterString.toLowerCase()) ||
          recipe.description.toLowerCase().includes(filterString.toLowerCase())
        )
      })
    }

    // Handle favorite
    if (favorite !== null) {
      recipes = recipes.filter((recipe) => {
        return recipe.isFavorite === favorite
      })
    }
    return recipes
  }, [filterString, initial.recipes, sortByTitle, favorite])

  return (
    <RecipesContext.Provider
      value={{
        sortByTitle,
        setSortByTitle,
        favorite,
        setFavorite,
        filterString,
        setFilterString,
        data: {
          isLoading: initial.isLoading,
          recipes,
        },
      }}
    >
      {children}
    </RecipesContext.Provider>
  )
}

export const useRecipes = () => {
  const context = useContext(RecipesContext)

  if (context === null) {
    throw Error(' useRecipes can only be used with a <RecipesProvider />')
  }

  return context
}
