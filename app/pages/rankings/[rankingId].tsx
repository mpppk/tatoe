import { Suspense } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import deleteRanking from "app/rankings/mutations/deleteRanking"
import { Ranking } from "app/rankings/components/Ranking"
import { CompareListItemProps } from "../../rankings/components/RankingItemCard"

export const ShowRanking = () => {
  const router = useRouter()
  const rankingId = useParam("rankingId", "number")
  const [deleteRankingMutation] = useMutation(deleteRanking)
  const [ranking] = useQuery(getRanking, { id: rankingId })

  const compares: CompareListItemProps[] = [
    {
      rankingName: "ガンダム人気キャラクター",
      itemName: "カミーユ",
      url: "/c/xxx",
    },
    {
      rankingName: "人気声優",
      itemName: "山寺宏一",
      url: "/c/xxx",
    },
    {
      rankingName: "Spotify国内再生数",
      itemName: "夜に駆ける／YOASOBI",
      url: "/c/xxx",
    },
  ]

  const handleClickDeleteButton = async () => {
    if (window.confirm("This will be deleted")) {
      await deleteRankingMutation({ id: ranking.id })
      router.push(Routes.RankingsPage())
    }
  }

  return (
    <>
      <Head>
        <title>{ranking.title}ランキング</title>
      </Head>
      <Ranking
        id={ranking.id}
        title={ranking.title}
        description={ranking.description}
        items={ranking.items.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
        }))}
        compares={compares}
        onClickDeleteButton={handleClickDeleteButton}
      />
    </>
  )
}

const ShowRankingPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowRanking />
      </Suspense>
    </div>
  )
}

ShowRankingPage.authenticate = true
ShowRankingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRankingPage
