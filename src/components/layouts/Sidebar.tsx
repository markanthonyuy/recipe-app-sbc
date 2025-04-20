import {
  Drawer,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { SortType } from '@/constants/Sort'
import { useRecipes } from '@/providers/RecipesProvider'
import { DRAWER_WIDTH, MAIN_HEADER_HEIGHT_WITH_PADDING } from '@/constants/Misc'
import { useDispatch, useSelector } from 'react-redux'
import { filterIsFavorite, sort } from '@/state/recipes/recipesSlice'
import { RootState } from '@/state/store'

const BaseDrawer = styled(Drawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    background: '#f3f3f3',
  },
})

const BaseSidebar = styled(Stack)({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: MAIN_HEADER_HEIGHT_WITH_PADDING + 20,
})

const Select = styled('select')(({ theme }) => ({
  background: '#fff',
  padding: 10,
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #ccc',
}))

const FilterBox = styled(Stack)(({ theme }) => ({
  background: '#fff',
  padding: 20,
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
}))

export const Sidebar = () => {
  const { recipes, filterFavorite } = useSelector(
    (state: RootState) => state.recipes
  )
  const dispatch = useDispatch()
  // const { handleSortRecipes, handleFilterFavorite, favorite } = useRecipes()
  return (
    <BaseDrawer variant="permanent" anchor="left">
      <BaseSidebar useFlexGap gap={5}>
        <Stack useFlexGap gap={2}>
          <Typography variant="subtitle1">Sort by Title</Typography>
          <Select
            onChange={(e) => {
              // handleSortRecipes(e.currentTarget.value as keyof typeof SortType)
              dispatch(sort(e.currentTarget.value as keyof typeof SortType))
            }}
          >
            {Object.entries(SortType).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              )
            })}
          </Select>
        </Stack>
        <Stack useFlexGap gap={2}>
          <Typography variant="subtitle1">Filter</Typography>

          <FilterBox useFlexGap gap={1}>
            <Typography variant="subtitle2">Favorites?</Typography>
            <RadioGroup
              name="favorites-radio-buttons-group"
              onChange={(e) => {
                dispatch(
                  filterIsFavorite(
                    e.currentTarget.value === 'YES'
                      ? 'FAVORITE'
                      : 'NOT_FAVORITE'
                  )
                )
                // handleFilterFavorite(e.currentTarget.value === 'YES')
              }}
            >
              <FormControlLabel
                value="YES"
                control={<Radio checked={filterFavorite === 'FAVORITE'} />}
                label="Yes"
              />
              <FormControlLabel
                value="NO"
                control={<Radio checked={filterFavorite === 'NOT_FAVORITE'} />}
                label="No"
              />
            </RadioGroup>
          </FilterBox>

          <Link
            component="button"
            variant="body2"
            onClick={() => {
              dispatch(filterIsFavorite('ALL'))
            }}
          >
            Reset favorites
          </Link>
        </Stack>
      </BaseSidebar>
    </BaseDrawer>
  )
}
