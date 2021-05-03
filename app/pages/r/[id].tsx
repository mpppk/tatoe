import { BlitzPage, Link } from "blitz"
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import LooksOneIcon from "@material-ui/icons/LooksOne"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Header } from "../../components/AppBar"

const RankCard = () => {
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
        title={<Typography variant={"h6"}>Title</Typography>}
        // subheader="YYYランキング"
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List dense={true}>
          <Link href={"/c/xxx"}>
            <ListItem>
              <ListItemText primary="ZZZのWWWぐらい" />
            </ListItem>
          </Link>
          <Link href={"/c/xxx"}>
            <ListItem>
              <ListItemText primary="ZZZのWWWぐらい" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      {/*<CardContent>*/}
      {/*</CardContent>*/}
      {/*<CardActions>*/}
      {/*  <Button size="small">Learn More</Button>*/}
      {/*</CardActions>*/}
    </Card>
  )
}

const Ranking: BlitzPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>XXXランキング</Typography>
        <Typography variant={"subtitle1"}>XXXランキングの説明です</Typography>
        <RankCard />
        <RankCard />
        <RankCard />
      </Container>
    </>
  )
}

export default Ranking
