import { BlitzPage, Link, Routes, useQuery } from "blitz"
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { Suspense } from "react"
import { Header } from "../components/Header"
import getRankings from "../rankings/queries/getRankings"
import { LinkListItem } from "../core/components/LinkListItem"

const useStyles = makeStyles((_theme) => ({
  moreButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

interface LatestRankingsProps {}

const LatestRankings: React.FC<LatestRankingsProps> = () => {
  const [rankings] = useQuery(getRankings, { take: 5 })
  return (
    <List dense={true}>
      {rankings.rankings.map((ranking) => (
        <LinkListItem
          key={ranking.id}
          href={Routes.ShowRankingPage({ rankingId: ranking.id })}
          text={ranking.title}
        />
      ))}
    </List>
  )
}

const Home: BlitzPage = () => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>新着ランキング</Typography>
        <Suspense fallback={<div>loading...</div>}>
          <LatestRankings />
        </Suspense>
        <div className={classes.moreButtonWrapper}>
          <Link href={Routes.RankingsPage()}>
            <Button color={"inherit"}>もっと見る</Button>
          </Link>
        </div>
        <Typography variant={"h5"}>人気ランキング</Typography>
        <List dense={true}>
          <ListItem>
            <ListItemText primary="Coming soon..." />
          </ListItem>
        </List>
        <div className={classes.moreButtonWrapper}>
          <Link href={"/"}>
            <Button disabled={true} color={"inherit"}>
              もっと見る
            </Button>
          </Link>
        </div>
      </Container>
    </>
  )
}

export default Home
