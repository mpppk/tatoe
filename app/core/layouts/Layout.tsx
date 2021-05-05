import React, { ReactNode } from "react"
import { Head } from "blitz"
import { Header } from "../../components/Header"
import { Container } from "@material-ui/core"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "tatoe"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
