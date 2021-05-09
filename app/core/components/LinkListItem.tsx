import { Link, LinkProps } from "blitz"
import { Link as MUILink, ListItem, ListItemText } from "@material-ui/core"
import React from "react"

type Props = {
  text: string
} & LinkProps

export const LinkListItem: React.FC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <MUILink>
        <ListItem>
          <ListItemText primary={props.text} color={"primary"} />
        </ListItem>
      </MUILink>
    </Link>
  )
}
