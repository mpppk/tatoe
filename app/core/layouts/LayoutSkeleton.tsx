import { Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import MenuIcon from "@material-ui/icons/Menu"
import { Link, Routes } from "blitz"
import { Skeleton } from "@material-ui/lab"
import { Footer } from "../../components/Footer"

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}))

const HeaderSkeleton = () => {
  const classes = useStyles()
  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color={"inherit"}
        aria-label="menu"
        disabled={true}
      >
        <MenuIcon />
      </IconButton>
      <Link href={"/"}>
        <Typography variant="h6" className={classes.title}>
          たぶんアレくらい
        </Typography>
      </Link>
      <Link href={Routes.LoginPage()}>
        <Button color="inherit">
          <Skeleton width={"100%"} />
        </Button>
      </Link>
    </Toolbar>
  )
}

export const LayoutSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />
      <Skeleton variant="rect" height={"300px"} />
      <Footer />
    </>
  )
}
