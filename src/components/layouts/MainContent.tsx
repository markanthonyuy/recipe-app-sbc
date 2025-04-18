import { styled, Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CardList } from '../common/CardList'
import { useRecipes } from '@/providers/RecipesProvider'
import {
  MAIN_HEADER_HEIGHT,
  MAIN_HEADER_HEIGHT_WITH_PADDING,
} from '@/constants/Misc'

const BaseMainContent = styled(Box)({
  flexGrow: 1,
  position: 'relative',
  padding: 20,
  paddingBottom: 50,
  marginTop: MAIN_HEADER_HEIGHT_WITH_PADDING, // Height of AppBar
  height: `calc(100vh - ${MAIN_HEADER_HEIGHT}px)`,
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
        <Fab color="primary" size="small" aria-label="add" href="/add">
          <AddIcon />
        </Fab>
      </Top>
      <CardList recipes={data.recipes} loading={data.isLoading} />
    </BaseMainContent>
  )
}
