import { HEADER_VERTICAL_PADDING } from '@/constants/Misc'
import { styled, AppBar, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

const HeaderContainer = styled(AppBar)({
  zIndex: 1400,
  paddingTop: HEADER_VERTICAL_PADDING,
  paddingBottom: HEADER_VERTICAL_PADDING,
})

const BaseToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
})

export const Header = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <HeaderContainer position="fixed">
      <BaseToolbar>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        {children}
      </BaseToolbar>
    </HeaderContainer>
  )
}
