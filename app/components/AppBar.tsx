import { Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React from "react"
import { Link } from "@blitzjs/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
export const Header = () => {
  const classes = useStyles()
  return (
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color={"inherit"} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Link href={"/"}>
        <Typography variant="h6" className={classes.title}>
          tatoe
        </Typography>
      </Link>
      <Button color="inherit">Login</Button>
    </Toolbar>
  )
}
