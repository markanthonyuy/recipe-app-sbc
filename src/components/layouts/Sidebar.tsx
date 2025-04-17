import {
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { MAIN_HEADER_HEIGHT } from './MainContent'
import { SortType } from '@/constants/Sort'

const drawerWidth = 340

const BaseDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: '#f1f1f1',
  },
})

const BaseSidebar = styled(Stack)({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: MAIN_HEADER_HEIGHT + 20,
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
  return (
    <BaseDrawer variant="permanent" anchor="left">
      <BaseSidebar useFlexGap gap={5}>
        <Stack useFlexGap gap={2}>
          <Typography variant="subtitle1">Sort by Title</Typography>
          <Select>
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
            <RadioGroup defaultValue="Yes" name="favorites-radio-buttons-group">
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FilterBox>
        </Stack>
      </BaseSidebar>
    </BaseDrawer>
  )
}
