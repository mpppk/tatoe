import React, { ReactNode } from "react"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Container, makeStyles } from "@material-ui/core"

type LayoutProps = {
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  contentWrap: {
    paddingBottom: "60px",
  },
}))

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles()
  return (
    <>
      <Header />
      {/* FIXME */}
      <Container className={classes.contentWrap}>{children as any}</Container>
      <Footer />
    </>
  )
}

export default Layout
