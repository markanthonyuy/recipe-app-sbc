import { InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

const BaseSearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: 500,
  width: 400,
}))

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  zIndex: 1000,
  cursor: 'pointer',
}))

type Props = {
  searchTerm: string
  onSearch: (searchTerm: string) => void
}

export const SearchInput = (props: Props) => {
  return (
    <Search>
      <SearchIconWrapper
        onClick={() => {
          props.onSearch(props.searchTerm)
        }}
      >
        <SearchIcon color="action" />
      </SearchIconWrapper>
      <BaseSearchInput
        placeholder="Search here…"
        inputProps={{
          'aria-label': 'search',
          value: props.searchTerm,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
              props.onSearch(e.currentTarget.value)
            }
          },
          onInput: (e) => {
            props.onSearch(e.currentTarget.value)
          },
        }}
      />
    </Search>
  )
}
