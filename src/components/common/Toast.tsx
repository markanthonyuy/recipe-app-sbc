import { Snackbar, Alert, AlertProps } from '@mui/material'

type Props = {
  message: string
  isOpen: boolean
  setOnClose: () => void
  type: AlertProps['severity']
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
        props.setOnClose()
      }}
      autoHideDuration={5000}
    >
      <Alert
        onClose={() => {
          props.setOnClose()
        }}
        severity={props.type}
        variant="filled"
      >
        {props.message}
      </Alert>
    </Snackbar>
  )
}
