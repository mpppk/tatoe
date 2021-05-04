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
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import LooksOneIcon from "@material-ui/icons/LooksOne"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Header } from "../../../components/Header"

const useStyles = makeStyles((theme) => ({
  editButtonWrapper: {
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
      <ListItem>
        <ListItemText primary={`${props.rankingName}の${props.itemName}ぐらい`} />
      </ListItem>
    </Link>
  )
}

interface ItemCardProps {
  name: string
  subheader: string
  compares: CompareListItemProps[]
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const [expand, setExpand] = useState(false)
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="rank1">
            <LooksOneIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="expand more" onClick={() => setExpand(!expand)}>
            <ExpandMoreIcon />
          </IconButton>
        }
        title={<Typography variant={"h6"}>{props.name}</Typography>}
        subheader={props.subheader}
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List dense={true}>
          {props.compares.map((c) => (
            <CompareListItem rankingName={c.rankingName} itemName={c.itemName} url={c.url} />
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
        <Typography variant={"body1"}>Created by User1</Typography>
        <Typography variant={"body1"}>Updated by User2</Typography>
      </Container>
    </>
  )
}

export default Ranking
