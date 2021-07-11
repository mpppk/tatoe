import React, { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRankings from "app/rankings/queries/getRankings"
import { Button, Link as MUILink, Typography } from "@material-ui/core"
import { RankingList } from "../../components/RankingList"

const ITEMS_PER_PAGE = 10

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
  return (
    <>
      <Head>
        <title>Rankings</title>
      </Head>

      <div>
        <Typography variant={"h5"}>新着ランキング</Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <PaginatedRankingList />
        </Suspense>
      </div>
      <p>
        <Link href={Routes.NewRankingPage()}>
          <MUILink>ランキングを作る</MUILink>
        </Link>
      </p>
    </>
  )
}

RankingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RankingsPage
