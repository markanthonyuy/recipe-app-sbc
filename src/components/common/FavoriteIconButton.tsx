import { styled, IconButton } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { useDispatch } from 'react-redux'
import { toggleIsFavorite } from '@/state/recipes/recipesSlice'

const FavoriteButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
})

type Props = {
  isFavorite: boolean
  id: string
  // handleSetFavorite: (id: string) => void
}

export const FavoriteIconButton = (props: Props) => {
  const dispatch = useDispatch()
  return (
    <FavoriteButton
      onClick={() => {
        // props.handleSetFavorite(props.id)
        dispatch(toggleIsFavorite(props.id))
      }}
    >
      {props.isFavorite ? (
        <StarIcon htmlColor="yellow" />
      ) : (
        <StarOutlineIcon htmlColor="yellow" />
      )}
    </FavoriteButton>
  )
}
