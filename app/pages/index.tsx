import { BlitzPage, Link } from "blitz"
import {
  Button,
  Container,
  Link as MUILink,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React from "react"
import { Header } from "../components/Header"

const useStyles = makeStyles((theme) => ({
  moreButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

const Home: BlitzPage = () => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>新着ランキング</Typography>
        <List dense={true}>
          <Link href={"/r/1"}>
            <MUILink>
              <ListItem>
                <ListItemText primary="2020年の安打数ランキング" />
              </ListItem>
            </MUILink>
          </Link>
          <Link href={"/r/2"}>
            <MUILink>
              <ListItem>
                <ListItemText primary="ガンダムの人気キャラクターランキング" />
              </ListItem>
            </MUILink>
          </Link>
          <Link href={"/r/3"}>
            <MUILink>
              <ListItem>
                <ListItemText primary="声優知名度ランキング" />
              </ListItem>
            </MUILink>
          </Link>
        </List>
        <div className={classes.moreButtonWrapper}>
          <Link href={"/"}>
            <Button color={"inherit"}>もっと見る</Button>
          </Link>
        </div>
        <Typography variant={"h5"}>人気ランキング</Typography>
        <List dense={true}>
          <Link href={"/r/1"}>
            <MUILink>
              <ListItem>
                <ListItemText primary="2020年の安打数ランキング" />
              </ListItem>
            </MUILink>
          </Link>
          <Link href={"/r/2"}>
            <MUILink>
              <ListItem>
                <ListItemText primary="ガンダムの人気キャラクターランキング" />
              </ListItem>
            </MUILink>
          </Link>
          <Link href={"/r/3"}>
            <MUILink>
              <ListItem>
                <ListItemText primary="声優知名度ランキング" />
              </ListItem>
            </MUILink>
          </Link>
        </List>
        <div className={classes.moreButtonWrapper}>
          <Link href={"/"}>
            <Button color={"inherit"}>もっと見る</Button>
          </Link>
        </div>
      </Container>
    </>
  )
}

export default Home
