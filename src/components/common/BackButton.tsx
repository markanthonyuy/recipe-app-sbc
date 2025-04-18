import { Box, Button, styled } from '@mui/material'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const BackButtonContainer = styled(Box)({
  display: 'inline-block',
})

type Props = {
  href: string
  label: string
}

export const BackButton = (props: Props) => {
  return (
    <BackButtonContainer>
      <Link href={props.href}>
        <Button
          component="label"
          variant="text"
          tabIndex={-1}
          startIcon={<ArrowBackIcon />}
        >
          {props.label}
        </Button>
      </Link>
    </BackButtonContainer>
  )
}
