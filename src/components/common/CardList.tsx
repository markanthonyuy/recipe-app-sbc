import { Recipe } from '@/types/Recipes'
import { styled, Stack, Typography, Link, Box, IconButton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Image from 'next/image'
import Divider from '@mui/material/Divider'
import { formatDate } from '@/helpers/date'

const CardListContainer = styled(Stack)({
  background: '#fff',
})

const Card = styled(Stack)(({ theme }) => ({
  background: '#fff',
  height: '200px',
  width: '100%',
  padding: 20,
  borderRadius: theme.shape.borderRadius,
  flexDirection: 'row',
  display: 'flex',
}))

const ImageContainer = styled(Box)({
  width: '164px',
  height: '164px',
  position: 'relative',
  background: '#f3f3f3',
})

const Information = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
})

const MainInfo = styled(Stack)({
  display: 'flex',
  justifyContent: 'space-between',
})

const MoreInfo = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
})

const FavoriteButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
})

const TitleText = styled(Typography)({
  display: '-webkit-box',
  lineClamp: 1,
  WebkitLineClamp: 1,
  boxOrient: 'vertical',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'initial',
})

const BodyText = styled(Typography)({
  display: '-webkit-box',
  lineClamp: 3,
  WebkitLineClamp: 3,
  boxOrient: 'vertical',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'initial',
})

const EmptyCardListContainer = styled(Stack)({
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

type Props = {
  recipes: Recipe[] | null
}

export const CardList = (props: Props) => {
  if (!props.recipes?.length) {
    return (
      <EmptyCardListContainer>
        <Typography variant="h5">No Record Found!</Typography>
      </EmptyCardListContainer>
    )
  }
  return (
    <CardListContainer gap={2}>
      {props.recipes?.map((recipe) => {
        return (
          <>
            <Card useFlexGap gap={3} key={recipe.id}>
              <ImageContainer>
                <Image
                  src={recipe.image}
                  alt={`Photo of ${recipe.title}`}
                  width="164"
                  height="164"
                />
                <FavoriteButton>
                  {recipe.isFavorite ? (
                    <StarIcon htmlColor="yellow" />
                  ) : (
                    <StarOutlineIcon htmlColor="yellow" />
                  )}
                </FavoriteButton>
              </ImageContainer>
              <Information>
                <MainInfo useFlexGap gap={1}>
                  <TitleText variant="h6">{recipe.title}</TitleText>
                  <BodyText variant="body2">{recipe.description}</BodyText>
                  <Link href={`recipe/${recipe.id}`} variant="body2">
                    See more
                  </Link>
                </MainInfo>
                <MoreInfo>
                  <Typography variant="body2" color="textSecondary">
                    Added by: {recipe.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {formatDate(recipe.dateCreated)}
                  </Typography>
                </MoreInfo>
              </Information>
            </Card>
            <Divider />
          </>
        )
      })}
    </CardListContainer>
  )
}
