import React from "react"
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

const useStyles = makeStyles((_theme) => ({
  skeletonList: {
    borderBottom: "1px solid #dcdcdc",
    padding: _theme.spacing(1),
  },
}))

interface Props {
  length: number
}

export const RankingsSkeleton: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <List dense={true}>
      {Array(props.length)
        .fill(undefined)
        .map((_, i) => (
          <ListItem className={classes.skeletonList} key={`ranking_skeleton_${i}`}>
            <ListItemText color={"primary"}>
              <Skeleton width={"100%"} variant={"text"} />
            </ListItemText>
          </ListItem>
        ))}
    </List>
  )
}
