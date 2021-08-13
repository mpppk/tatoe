import { Link, LinkProps } from "blitz"
import { Link as MUILink, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import React from "react"

type Props = {
  text: string
} & LinkProps

const useStyles = makeStyles((_theme) => ({
  linkListItem: {
    borderBottom: "1px solid #dcdcdc",
    padding: _theme.spacing(1),
  },
}))

export const LinkListItem: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <Link href={props.href}>
      <MUILink href="#">
        <ListItem className={classes.linkListItem}>
          <ListItemText primary={props.text} color={"primary"} />
        </ListItem>
      </MUILink>
    </Link>
  )
}
