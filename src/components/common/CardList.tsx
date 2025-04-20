import { Recipe } from '@/types/Recipes'
import { styled, Stack, Typography, Box } from '@mui/material'
import Image from 'next/image'
import Divider from '@mui/material/Divider'
import { formatDate } from '@/helpers/date'
import CircularProgress from '@mui/material/CircularProgress'
import { Fragment } from 'react'
import { FavoriteIconButton } from './FavoriteIconButton'
import Link from 'next/link'

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
  background: '#ccc',
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
  recipes?: Recipe[] | null
  loading: boolean
  handleSetFavorite: (id: string) => void
}

export const CardList = (props: Props) => {
  if (props.loading) {
    return (
      <EmptyCardListContainer>
        <CircularProgress />
      </EmptyCardListContainer>
    )
  }
  if (!props.recipes?.length && !props.loading) {
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
          <Fragment key={recipe.id}>
            <Card useFlexGap gap={3}>
              <ImageContainer>
                {recipe.image && (
                  <Image
                    src={`/images/${recipe.image}?${new Date(
                      recipe.dateModified
                    ).getSeconds()}`}
                    alt={`Photo of ${recipe.title}`}
                    width="164"
                    height="164"
                  />
                )}
                <FavoriteIconButton
                  isFavorite={!!recipe.isFavorite}
                  id={recipe.id}
                  handleSetFavorite={props.handleSetFavorite}
                />
              </ImageContainer>
              <Information>
                <MainInfo useFlexGap gap={1}>
                  <TitleText variant="h6">{recipe.title}</TitleText>
                  <BodyText variant="body2">{recipe.instructions}</BodyText>
                  {recipe.id && (
                    <Link href={recipe.id}>
                      <Typography variant="body2">See more</Typography>
                    </Link>
                  )}
                </MainInfo>
                <MoreInfo>
                  <Typography variant="body2" color="textSecondary">
                    Added by: {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {formatDate(new Date(recipe.dateCreated))}
                  </Typography>
                </MoreInfo>
              </Information>
            </Card>
            <Divider />
          </Fragment>
        )
      })}
    </CardListContainer>
  )
}
