import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

type Props = {
  isOpen: boolean
  onCloseClick: () => void
  title: string
  message: string
  onConfirmClick: () => void
}

export const ConfirmDialog = (props: Props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onCloseClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCloseClick} color="warning">
          Cancel
        </Button>
        <Button onClick={props.onConfirmClick} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
