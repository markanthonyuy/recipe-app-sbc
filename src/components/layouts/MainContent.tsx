import { styled, Box, Fab } from '@mui/material'
import { HEADER_VERTICAL_PADDING } from './MainHeader'
import AddIcon from '@mui/icons-material/Add'
import { CardList } from '../common/CardList'
import { Recipe } from '@/types/Recipes'
import { useRecipes } from '@/providers/RecipesProvider'
export const MAIN_HEADER_HEIGHT = 64 + HEADER_VERTICAL_PADDING * 2

const BaseMainContent = styled(Box)({
  flexGrow: 1,
  position: 'relative',
  padding: 20,
  paddingBottom: 50,
  marginTop: MAIN_HEADER_HEIGHT, // Height of AppBar
  height: 'calc(100vh - 64px)',
  overflowY: 'auto',
  background: '#f3f3f3',
})

const Top = styled(Box)({
  position: 'absolute',
  top: 10,
  right: 10,
})

export const MainContent = () => {
  const { data } = useRecipes()

  return (
    <BaseMainContent>
      <Top>
        <Fab color="primary" size="small" aria-label="add" href="/recipe/add">
          <AddIcon />
        </Fab>
      </Top>
      <CardList recipes={data.recipes} loading={data.isLoading} />
    </BaseMainContent>
  )
}
