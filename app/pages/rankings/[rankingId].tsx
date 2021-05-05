import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import deleteRanking from "app/rankings/mutations/deleteRanking"

export const Ranking = () => {
  const router = useRouter()
  const rankingId = useParam("rankingId", "number")
  const [deleteRankingMutation] = useMutation(deleteRanking)
  const [ranking] = useQuery(getRanking, { id: rankingId })

  return (
    <>
      <Head>
        <title>Ranking {ranking.id}</title>
      </Head>

      <div>
        <h1>Ranking {ranking.id}</h1>
        <pre>{JSON.stringify(ranking, null, 2)}</pre>

        <Link href={Routes.EditRankingPage({ rankingId: ranking.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRankingMutation({ id: ranking.id })
              router.push(Routes.RankingsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowRankingPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RankingsPage()}>
          <a>Rankings</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Ranking />
      </Suspense>
    </div>
  )
}

ShowRankingPage.authenticate = true
ShowRankingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRankingPage
