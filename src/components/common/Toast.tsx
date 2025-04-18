import { Snackbar, Alert } from '@mui/material'

type Props = {
  message: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}
export const Toast = (props: Props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={props.isOpen}
      onClose={() => {
        props.setIsOpen(false)
      }}
      autoHideDuration={5000}
    >
      <Alert
        onClose={() => {
          props.setIsOpen(false)
        }}
        severity="success"
        variant="filled"
      >
        {props.message}
      </Alert>
    </Snackbar>
  )
}
