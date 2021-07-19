import { Suspense } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import deleteRanking from "app/rankings/mutations/deleteRanking"
import { Ranking } from "app/rankings/components/Ranking"
import getRandomRankings from "../../queries/getRandomRankings"

const RankingPage: BlitzPage = () => {
  const router = useRouter()
  const rankingId = useParam("rankingId", "number")
  const [deleteRankingMutation] = useMutation(deleteRanking)
  const [ranking] = useQuery(getRanking, { id: rankingId })
  const [otherRankings] = useQuery(getRandomRankings, {
    take: 3,
    ignoreID: ranking.id,
  })

  const handleClickDeleteButton = async () => {
    if (window.confirm(`${ranking.title}ランキングを削除しますか?`)) {
      await deleteRankingMutation({ id: ranking.id })
      router.push(Routes.RankingsPage())
    }
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Head>
          <title>{ranking.title}ランキング</title>
        </Head>
        <Ranking
          id={ranking.id}
          title={ranking.title}
          description={ranking.description}
          source={ranking.source}
          canBeEditedByAnotherUser={ranking.canBeEditedByAnotherUser}
          items={ranking.items.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
          }))}
          owner={ranking.owner}
          rankings={otherRankings}
          onClickDeleteButton={handleClickDeleteButton}
        />
      </Suspense>
    </div>
  )
}

RankingPage.getLayout = (page) => <Layout>{page}</Layout>

export default RankingPage
