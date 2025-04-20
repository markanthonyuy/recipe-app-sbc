import { SearchInput } from '../forms/SearchInput'
import { useRecipes } from '@/providers/RecipesProvider'
import { Header } from '../common/Header'

export const MainHeader = () => {
  // const { filterString, handleFilterRecipes } = useRecipes()

  return (
    <Header title="Recipe App">
      {/* <SearchInput
        searchTerm={filterString}
        onSearch={(searchTerm: string) => {
          handleFilterRecipes(searchTerm)
        }}
      /> */}
    </Header>
  )
}
