import { makeStyles } from "@material-ui/core"
import { Home, Create, PhoneInTalk } from "@material-ui/icons"
import React, { useState, Suspense } from "react"
import { Link, Routes, useRouter, useSession } from "blitz"

const useStyles = makeStyles((theme) => ({
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
  const session = useSession()

  const router = useRouter()
  return (
    <div className={classes.footer}>
      <div className={classes.iconItem}>
        <Home className={classes.icon} />
        <p className={classes.label}>ホーム</p>
      </div>
      <div className={classes.iconItem}>
        <Create className={classes.icon} />
        <p className={classes.label}>新規作成</p>
      </div>
      <div className={classes.iconItem}>
        <PhoneInTalk className={classes.icon} />
        <p className={classes.label}>お問い合わせ</p>
      </div>
    </div>
  )
}
