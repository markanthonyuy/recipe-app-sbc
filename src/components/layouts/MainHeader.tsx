import { SearchInput } from '../forms/SearchInput'
import { useRecipes } from '@/providers/RecipesProvider'
import { Header } from '../common/Header'
import { useDispatch } from 'react-redux'
import { search } from '@/state/recipes/recipesSlice'
import { useState } from 'react'

export const MainHeader = () => {
  const [searchTerm, setSearchTerm] = useState('')
  // const { filterString, handleFilterRecipes } = useRecipes()
  const dispatch = useDispatch()

  return (
    <Header title="Recipe App">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={(searchTerm: string) => {
          setSearchTerm(searchTerm)
          dispatch(search(searchTerm))
        }}
      />
    </Header>
  )
}
