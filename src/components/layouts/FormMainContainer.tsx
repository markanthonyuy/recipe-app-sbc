import {
  MAIN_HEADER_HEIGHT_WITH_PADDING,
  MAIN_HEADER_HEIGHT,
} from '@/constants/Misc'
import { styled, Box } from '@mui/material'

export const FormMainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  paddingTop: 20,
  paddingBottom: 20,
  marginTop: MAIN_HEADER_HEIGHT_WITH_PADDING, // Height of AppBar
  height: `calc(100vh - ${MAIN_HEADER_HEIGHT}px)`,
  overflowY: 'auto',
  background: '#f3f3f3',
})
