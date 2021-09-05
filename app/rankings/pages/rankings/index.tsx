import React, { Suspense } from "react"
import Meta from "../../../components/Meta"
import { usePaginatedQuery, useRouter, BlitzPage, Routes, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRankings from "app/rankings/queries/getRankings"
import { Button, Typography, makeStyles } from "@material-ui/core"
import { NewReleases, Create } from "@material-ui/icons"
import { RankingList } from "../../components/RankingList"
import { RankingsSkeleton } from "../../components/RankingsSkeleton"

const ITEMS_PER_PAGE = 10

const useStyles = makeStyles((_theme) => ({
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
  buttonPrimary: {
    margin: "0px auto",
    marginTop: _theme.spacing(1),
    width: "100%",
  },
  buttonText: {
    marginLeft: "2px",
  },
}))

export const PaginatedRankingList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ rankings, hasMore }] = usePaginatedQuery(getRankings, {
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <RankingList rankings={rankings} />
      <Button disabled={page === 0} onClick={goToPreviousPage}>
        前のページ
      </Button>
      <Button disabled={!hasMore} onClick={goToNextPage}>
        次のページ
      </Button>
    </div>
  )
}

const RankingsPage: BlitzPage = () => {
  const classes = useStyles()
  return (
    <>
      <Meta title="新着ランキング" />
      <div>
        <Typography className={classes.listTitle}>
          <NewReleases className={classes.listTitleIcon} />
          <span className={classes.listTitleText}>新着ランキング</span>
        </Typography>
        <Suspense fallback={<RankingsSkeleton length={5} />}>
          <PaginatedRankingList />
        </Suspense>
      </div>
      <p>
        <Link href={Routes.NewRankingPage()}>
          <Button color={"primary"} variant={"contained"} className={classes.buttonPrimary}>
            <Create />
            <span className={classes.buttonText}>ランキングを作る</span>
          </Button>
        </Link>
      </p>
    </>
  )
}

RankingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RankingsPage
