import { Recipe } from '@/types/Recipes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define sort direction type
type SortDirection = 'ASC' | 'DESC'

// Define filter favorite type
type FilterFavorite = 'ALL' | 'FAVORITE' | 'NOT_FAVORITE'

// Define state interface
interface RecipeState {
  recipes: Recipe[]
  filteredRecipes: Recipe[]
  sortDirection: SortDirection
  filterFavorite: FilterFavorite
  searchQuery: string
}

const initialState: RecipeState = {
  recipes: [
    {
      id: '41f550cb-61bb-4206-b33d-df8a2203c198',
      title: 'Linguine With Clams',
      description:
        'Crebro veritatis universe considero casus ager denuo casso coepi ago. Tamen magni urbanus artificiose dignissimos. Verbum venia in virtus consequuntur conturbo cupio celebrer vergo. Tonsor eligendi nesciunt. Defaeco vinum cursim quo admitto. Crepusculum cilicium cruciamentum summa aperte cohaero cognomen vero fugiat. Quia color similique abundans nostrum auctus defaeco accendo. Caveo collum ad thesaurus asper clamo. Vicinus coaegresco deporto pecus. Deputo tendo cuppedia statim terga voluntarius currus temperantia aro. Convoco studio curia appono. Deprimo doloremque sustineo. Curiositas cupiditas texo tametsi caries depono vito. Ustilo coepi canto theca deserunt. Quae stillicidium adulescens acies cubicularis.',
      instructions:
        'Tenderly braised pigeon in a rich kaffir leaves and snowpea sprouts sauce, served with a side of creamy peppers.',
      name: 'Lola Beer',
      email: 'Arianna.Carroll@gmail.com',
      image: 'Linguine With Clams.jpg',
      isFavorite: false,
      dateCreated: new Date('2025-04-16T21:52:24.421Z'),
      dateModified: new Date('2025-04-16T21:52:24.421Z'),
    },
  ],
  filteredRecipes: [],
  sortDirection: 'ASC',
  filterFavorite: 'ALL',
  searchQuery: '',
}

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload)
      applyFilters(state)
    },
    delete: (state, action: PayloadAction<string>) => {
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

export default recipeSlice.reducer
