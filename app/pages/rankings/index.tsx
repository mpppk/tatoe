import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRankings from "app/rankings/queries/getRankings"

const ITEMS_PER_PAGE = 100

export const RankingsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ rankings, hasMore }] = usePaginatedQuery(getRankings, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {rankings.map((ranking) => (
          <li key={ranking.id}>
            <Link href={Routes.ShowRankingPage({ rankingId: ranking.id })}>
              <a>{ranking.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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
        <p>
          <Link href={Routes.NewRankingPage()}>
            <a>Create Ranking</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RankingsList />
        </Suspense>
      </div>
    </>
  )
}

RankingsPage.authenticate = true
RankingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RankingsPage
