import { SortType } from '@/constants/Sort'
import { Recipe } from '@/types/Recipes'
import INITIAL_RECIPES_DATA from '../../public/initial-recipes.json'
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
  checkTitleExists: (newTitle: string) => true,
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
  // favorite can be nullable to show the all state
  const [favorite, setFavorite] = useState<boolean | null>(null)
  const [filterString, setFilterString] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // @ts-expect-error because data comes from JSON
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES_DATA) // Master recipe list without any filters applied
  const [filteredRecipes, setFilteredRecipes] =
    // @ts-expect-error because data comes from JSON
    useState<Recipe[]>(INITIAL_RECIPES_DATA)

  const handleSortRecipes = useCallback(
    (sort: keyof typeof SortType) => {
      let tempRecipes: Recipe[] = []
      if (!recipes.length) {
        setSortByTitle(sort)
        setFilteredRecipes(recipes)
        return
      }

      // Requirements only ask for title to be sortable
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
      if (filterString?.length === 0) {
        setFilterString(filterString)
        setFilteredRecipes(recipes)
        return
      }

      // Searchable fields are title, instructions and name
      tempRecipes = recipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(filterString.toLowerCase()) ||
          recipe.instructions
            ?.toLowerCase()
            .includes(filterString.toLowerCase()) ||
          recipe.name?.toLowerCase().includes(filterString.toLowerCase())
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

  const checkTitleExists = useCallback(
    (newTitle: string) => {
      const recipeTitles = recipes.map((recipe) => {
        return recipe.title
      })

      return recipeTitles.includes(newTitle)
    },
    [recipes]
  )

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
        checkTitleExists,
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
