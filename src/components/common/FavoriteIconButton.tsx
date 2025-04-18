import { styled, IconButton } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

const FavoriteButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
})

type Props = {
  isFavorite: boolean
}

export const FavoriteIconButton = (props: Props) => {
  return (
    <FavoriteButton>
      {props.isFavorite ? (
        <StarIcon htmlColor="yellow" />
      ) : (
        <StarOutlineIcon htmlColor="yellow" />
      )}
    </FavoriteButton>
  )
}
