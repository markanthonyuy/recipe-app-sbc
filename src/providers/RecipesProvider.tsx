import { SortType } from '@/constants/Sort'
import { Recipe } from '@/types/Recipes'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'

const Recipes = {
  handleSortRecipes: (sort: keyof typeof SortType) => {},
  handleFilterFavorite: (favorite: boolean | null) => {},
  handleFilterRecipes: (filterString: string) => {},
  handleSetFavorite: (id: string) => {},
  sortByTitle: 'ASC',
  filterString: '',
  isLoading: false,
  handleSetRecipes: (recipes: Recipe[]) => {},
  setIsLoading: (loading: boolean) => {},
}

export const RecipesContext = createContext<
  | (typeof Recipes & {
      favorite?: boolean | null
      recipes?: Recipe[] | null
    })
  | null
>(null)

export const RecipesProvider = ({ children }: PropsWithChildren) => {
  const [sortByTitle, setSortByTitle] = useState<keyof typeof SortType>('ASC')
  const [favorite, setFavorite] = useState<boolean | null>(null)
  const [filterString, setFilterString] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])

  const handleSortRecipes = useCallback(
    (sort: keyof typeof SortType) => {
      let tempRecipes: Recipe[] = []
      if (!recipes.length) {
        setSortByTitle(sort)
        setFilteredRecipes(recipes)
        return
      }

      // Handle sort
      tempRecipes = recipes.sort((a, b) => {
        if (sort === 'ASC') {
          return a.title.localeCompare(b.title)
        } else {
          return b.title.localeCompare(a.title)
        }
      })
      setSortByTitle(sort)
      setFilteredRecipes(tempRecipes)
    },
    [recipes]
  )

  const handleFilterRecipes = useCallback(
    (filterString: string) => {
      let tempRecipes: Recipe[] = []
      console.log(filterString)
      if (filterString?.length === 0) {
        setFilterString(filterString)
        setFilteredRecipes(recipes)
        return
      }
      tempRecipes = recipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(filterString.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(filterString.toLowerCase())
        )
      })
      setFilterString(filterString)
      setFilteredRecipes(tempRecipes)
    },
    [recipes]
  )

  const handleFilterFavorite = useCallback(
    (favorite: boolean | null) => {
      let tempRecipes: Recipe[] = []
      if (favorite === null) {
        setFavorite(favorite)
        setFilteredRecipes(recipes)
        return
      }
      tempRecipes = recipes.filter((recipe) => {
        return recipe.isFavorite === favorite
      })
      setFavorite(favorite)
      setFilteredRecipes(tempRecipes)
    },
    [recipes]
  )

  const handleSetFavorite = (id: string) => {
    const newRecipes = recipes.map((recipe) => {
      return recipe.id !== id
        ? recipe
        : { ...recipe, isFavorite: !recipe.isFavorite }
    })

    const newFilteredRecipes = filteredRecipes.map((recipe) => {
      return recipe.id !== id
        ? recipe
        : { ...recipe, isFavorite: !recipe.isFavorite }
    })

    setRecipes(newRecipes)
    setFilteredRecipes(newFilteredRecipes)
  }

  const handleSetRecipes = useCallback((newRecipes: Recipe[]) => {
    setRecipes(newRecipes)
    setFilteredRecipes(newRecipes)
  }, [])

  return (
    <RecipesContext.Provider
      value={{
        handleSortRecipes,
        handleFilterFavorite,
        handleFilterRecipes,
        sortByTitle,
        favorite,
        filterString,
        recipes: filteredRecipes,
        handleSetRecipes,
        handleSetFavorite,
        setIsLoading,
        isLoading,
      }}
    >
      {children}
    </RecipesContext.Provider>
  )
}

export const useRecipes = () => {
  const context = useContext(RecipesContext)

  if (context === null) {
    throw Error('useRecipes can only be used with a <RecipesProvider />')
  }

  return context
}
