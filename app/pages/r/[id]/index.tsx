import { BlitzPage, Link } from "blitz"
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  List,
  Link as MUILink,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import clsx from "clsx"
import LooksOneIcon from "@material-ui/icons/LooksOne"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Header } from "../../../components/Header"

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  editButtonWrapper: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
}))

interface CompareListItemProps {
  rankingName: string
  itemName: string
  url: string
}

const CompareListItem: React.FC<CompareListItemProps> = (props) => {
  return (
    <Link href={props.url}>
      <MUILink>
        <ListItem>
          <ListItemText
            primary={`${props.rankingName}の${props.itemName}ぐらい`}
            color={"primary"}
          />
        </ListItem>
      </MUILink>
    </Link>
  )
}

interface ItemCardProps {
  name: string
  subheader: string
  compares: CompareListItemProps[]
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const classes = useStyles()
  const [expand, setExpand] = useState(false)
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="rank1">
            <LooksOneIcon />
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, { [classes.expandOpen]: expand })}
            aria-label="expand more"
            onClick={() => setExpand(!expand)}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={<Typography variant={"h6"}>{props.name}</Typography>}
        subheader={props.subheader}
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List dense={true}>
          {props.compares.map((c, i) => (
            <CompareListItem
              key={c.rankingName + i}
              rankingName={c.rankingName}
              itemName={c.itemName}
              url={c.url}
            />
          ))}
        </List>
      </Collapse>
    </Card>
  )
}

const Ranking: BlitzPage = () => {
  const classes = useStyles()
  const compares: CompareListItemProps[] = [
    {
      rankingName: "ガンダム人気キャラクター",
      itemName: "カミーユ",
      url: "/c/xxx",
    },
    {
      rankingName: "人気声優",
      itemName: "山寺宏一",
      url: "/c/xxx",
    },
    {
      rankingName: "Spotify国内再生数",
      itemName: "夜に駆ける／YOASOBI",
      url: "/c/xxx",
    },
  ]
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>2020年の安打数ランキング</Typography>
        <Typography variant={"subtitle1"}>2020年の安打数ランキングの説明です</Typography>
        <ItemCard name={"大島洋平"} subheader={"146本"} compares={compares} />
        <ItemCard name={"梶谷隆幸"} subheader={"140本"} compares={compares} />
        <ItemCard name={"近本光司"} subheader={"139本"} compares={compares} />
        <Link href={`/r/1/edit`}>
          <div className={classes.editButtonWrapper}>
            <Button color={"inherit"} variant={"contained"}>
              Edit
            </Button>
          </div>
        </Link>
        <Typography variant={"body1"}>
          Created by <MUILink>User1</MUILink>
        </Typography>
        <Typography variant={"body1"}>
          Updated by <MUILink>User2</MUILink>
        </Typography>
      </Container>
    </>
  )
}

export default Ranking
