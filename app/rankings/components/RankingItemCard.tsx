import React, { useState } from "react"
import { Link, Routes } from "blitz"
import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  Link as MUILink,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import LooksOneIcon from "@material-ui/icons/LooksOne"
import {
  Filter4,
  Filter5,
  Filter6,
  Filter7,
  Filter8,
  Filter9,
  Looks3,
  LooksTwo,
} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  firstAvatar: {
    background: "gold",
  },
  secondAvatar: {
    background: "silver",
  },
  thirdAvatar: {
    background: "brown",
  },
  card: {
    marginTop: theme.spacing(1),
  },
}))

export interface CompareListItemProps {
  cRankingName: string
  cItemName: string
  href: ReturnType<typeof Routes.ComparePage>
}

const CompareListItem: React.FC<CompareListItemProps> = (props) => {
  return (
    // FIXME
    <Link href={props.href}>
      <MUILink href="#">
        <ListItem>
          <ListItemText
            primary={`${props.cRankingName}の${props.cItemName}ぐらい`}
            color={"primary"}
          />
        </ListItem>
      </MUILink>
    </Link>
  )
}

interface RankIconProps {
  rank: number
}

const RankAvatar: React.FC<RankIconProps> = (props) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "gold"
      case 2:
        return "silver"
      case 3:
        return "brown"
    }
  }
  const style = props.rank <= 3 ? { backgroundColor: getRankColor(props.rank) } : {}
  return (
    <Avatar style={style} aria-label="rank1">
      <RankIcon rank={props.rank} />
    </Avatar>
  )
}

const RankIcon: React.FC<RankIconProps> = (props) => {
  switch (props.rank) {
    case 1:
      return <LooksOneIcon />
    case 2:
      return <LooksTwo />
    case 3:
      return <Looks3 />
    case 4:
      return <Filter4 />
    case 5:
      return <Filter5 />
    case 6:
      return <Filter6 />
    case 7:
      return <Filter7 />
    case 8:
      return <Filter8 />
    case 9:
      return <Filter9 />
    default:
      return <span>{props.rank}</span>
  }
}

interface ItemCardProps {
  title: string
  rank: number
  subheader: string
  compares: CompareListItemProps[]
  defaultExpand?: boolean
}

export const RankingItemCard: React.FC<ItemCardProps> = (props) => {
  const classes = useStyles()
  const [expand, setExpand] = useState(props.defaultExpand === true)
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<RankAvatar rank={props.rank} />}
        onClick={() => setExpand(!expand)}
        title={<Typography variant={"h6"}>{props.title}</Typography>}
        subheader={props.subheader}
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List dense={true}>
          {props.compares.map((c, i) => (
            <CompareListItem key={c.cRankingName + i} {...c} />
          ))}
        </List>
      </Collapse>
    </Card>
  )
}
