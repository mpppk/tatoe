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
import { NewReleases, Star, ArrowForwardIos, Create } from "@material-ui/icons"
import React, { Suspense } from "react"
import Meta from "../components/Meta"
import Loading from "app/components/Loading"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import getRankings from "../rankings/queries/getRankings"
import { LinkListItem } from "../core/components/LinkListItem"

const useStyles = makeStyles((_theme) => ({
  contentWrap: {
    paddingBottom: "60px",
  },
  mainContentWrapper: {
    textAlign: "center",
    border: "1px solid #808080",
    borderRadius: "4px",
  },
  moreButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  siteTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    padding: _theme.spacing(1),
    borderBottom: "1px solid #808080",
  },
  description: {
    padding: _theme.spacing(1),
    textAlign: "left",
  },
  listTitle: {
    backgroundColor: "#d3d3d3",
    fontSize: "18px",
    fontWeight: "bold",
    padding: _theme.spacing(1),
  },
  listTitleIcon: {
    position: "absolute",
  },
  listTitleText: {
    marginLeft: _theme.spacing(4),
  },
  listMoreButton: {
    fontSize: "8px",
    color: "#808080",
    marginBottom: _theme.spacing(2),
    borderRadius: "4px",
    border: "1px solid #808080",
  },
  listMoreIcon: {
    fontSize: "10px",
    marginRight: "2px",
    position: "relative",
    top: "-0.5px",
  },
  buttonPrimary: {
    marginTop: _theme.spacing(2),
    marginBottom: _theme.spacing(2),
  },
  buttonText: {
    marginLeft: "2px",
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
          href={Routes.RankingPage({ rankingId: ranking.id })}
          text={ranking.title}
        />
      ))}
    </List>
  )
}

const Top: BlitzPage = () => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container className={classes.contentWrap}>
        <Meta />
        <Container className={classes.mainContentWrapper}>
          <Typography className={classes.siteTitle}>たぶんアレくらいとは</Typography>
          <Typography className={classes.description}>
            「○○をガンダムで例えると?」、「○○ってドラゴンボールで言うところの何?」を簡単に調べたりシェアできるサイトです。
          </Typography>
        </Container>
        <Container className={classes.contentWrapper}>
          <Link href={Routes.NewRankingPage()}>
            <Button color={"primary"} variant={"contained"} className={classes.buttonPrimary}>
              <Create />
              <span className={classes.buttonText}>ランキングを作る</span>
            </Button>
          </Link>
        </Container>

        <Typography className={classes.listTitle}>
          <NewReleases className={classes.listTitleIcon} />
          <span className={classes.listTitleText}>新着ランキング</span>
        </Typography>
        <Suspense fallback={<Loading />}>
          <LatestRankings />
        </Suspense>
        <div className={classes.moreButtonWrapper}>
          <Link href={Routes.RankingsPage()}>
            <Button color={"inherit"} className={classes.listMoreButton}>
              <ArrowForwardIos className={classes.listMoreIcon} />
              もっと見る
            </Button>
          </Link>
        </div>
        <Typography className={classes.listTitle}>
          <Star className={classes.listTitleIcon} />
          <span className={classes.listTitleText}>人気ランキング</span>
        </Typography>
        <List dense={true}>
          <ListItem>
            <ListItemText primary="Coming soon..." />
          </ListItem>
        </List>
      </Container>
      <Footer />
    </>
  )
}

Top.authenticate = false

export default Top
