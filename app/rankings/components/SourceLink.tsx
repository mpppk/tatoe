import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import React from "react"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Link as MUILink,
  makeStyles,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((_theme) => ({
  link: {
    overflowWrap: "break-word",
  },
}))

interface SourceLinkProps {
  source: string | null
}

export const SourceLink: React.FC<SourceLinkProps> = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = setOpen.bind(null, true)
  const handleClose = setOpen.bind(null, false)

  if (props.source === null) {
    return <Typography variant={"subtitle1"}>引用元</Typography>
  }

  return (
    <>
      <Typography variant={"subtitle1"} onClick={handleClickOpen}>
        <MUILink href="#">引用元</MUILink>
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>外部のウェブサイトに移動します</DialogTitle>
        <DialogContent>
          <DialogContentText>
            よろしければ下記URLをクリックしてください。
            <br />
            <MUILink className={classes.link} href={props.source ?? "#"}>
              {props.source}
            </MUILink>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
