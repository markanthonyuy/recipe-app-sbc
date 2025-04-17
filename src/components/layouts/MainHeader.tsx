import { AppBar, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SearchInput } from '../forms/SearchInput'

export const HEADER_VERTICAL_PADDING = 10

const Header = styled(AppBar)({
  zIndex: 1400,
  paddingTop: HEADER_VERTICAL_PADDING,
  paddingBottom: HEADER_VERTICAL_PADDING,
})

const BaseToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
})

export const MainHeader = () => {
  return (
    <Header position="fixed">
      <BaseToolbar>
        <Typography variant="h6" noWrap component="div">
          Recipe App
        </Typography>
        <SearchInput
          onSearch={(searchTerm: string) => {
            console.log(searchTerm)
          }}
        />
      </BaseToolbar>
    </Header>
  )
}
