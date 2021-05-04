import { BlitzPage, Link } from "blitz"
import { Container, List, ListItem, ListItemText, Typography } from "@material-ui/core"
import React from "react"
import { Header } from "../components/Header"

const Home: BlitzPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>新着ランキング</Typography>
        <List dense={true}>
          <Link href={"/r/1"}>
            <ListItem>
              <ListItemText primary="XXXランキング" />
            </ListItem>
          </Link>
          <Link href={"/r/2"}>
            <ListItem>
              <ListItemText primary="XXXランキング" />
            </ListItem>
          </Link>
          <Link href={"/r/3"}>
            <ListItem>
              <ListItemText primary="XXXランキング" />
            </ListItem>
          </Link>
        </List>
      </Container>
    </>
  )
}

export default Home
