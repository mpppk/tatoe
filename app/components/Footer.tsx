import { makeStyles } from "@material-ui/core"
import { Home, Create, PermIdentity } from "@material-ui/icons"
import React from "react"
import { Link, Routes, useSession } from "blitz"

const useStyles = makeStyles((_theme) => ({
  footer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "gray",
    color: "#fff",
    textAlign: "center",
    padding: "5px 10%",
    position: "fixed",
    bottom: "0",
  },
  iconItem: {
    display: "block",
    cursor: "pointer",
  },
  icon: {
    fontSize: "1.5rem",
  },
  label: {
    margin: "0px",
    fontSize: "0.6rem",
  },
}))

export const Footer = () => {
  const classes = useStyles()
  const session = useSession({ suspense: false })

  return (
    <div className={classes.footer}>
      <Link href={"/"}>
        <div className={classes.iconItem}>
          <Home className={classes.icon} />
          <p className={classes.label}>TOP</p>
        </div>
      </Link>
      <Link href={Routes.NewRankingPage()}>
        <div className={classes.iconItem}>
          <Create className={classes.icon} />
          <p className={classes.label}>新規作成</p>
        </div>
      </Link>
      <Link
        href={
          session.userId
            ? Routes.UserPage({ userId: session.userId as string })
            : Routes.LoginPage()
        }
      >
        <div className={classes.iconItem}>
          <PermIdentity className={classes.icon} />
          <p className={classes.label}>マイページ</p>
        </div>
      </Link>
    </div>
  )
}
