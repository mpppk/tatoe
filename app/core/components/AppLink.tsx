import React from "react"
import { Link, Routes } from "blitz"
import { Link as MUILink } from "@material-ui/core"

interface AppLinkProps {
  href: string | ReturnType<typeof Routes.RankingsPage>
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
  return (
    <Link href={props.href}>
      <MUILink href="#">{props.children}</MUILink>
    </Link>
  )
}
