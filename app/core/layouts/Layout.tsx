import React, { ReactNode } from "react"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Container } from "@material-ui/core"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {/* FIXME */}
      <Container>{children as any}</Container>
      <Footer />
    </>
  )
}

export default Layout
