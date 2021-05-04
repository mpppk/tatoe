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
    </Card>
  )
}

const Ranking: BlitzPage = () => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>XXXランキング</Typography>
        <Typography variant={"subtitle1"}>XXXランキングの説明です</Typography>
        <RankCard />
        <RankCard />
        <RankCard />
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
