import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import updateRanking from "app/rankings/mutations/updateRanking"
import { RankingForm, FORM_ERROR } from "app/rankings/components/RankingForm"
import deleteRankingItems from "../../../../ranking-items/mutations/deleteRankingItems"
import { toUpdateRankingFromForm, UpdateRankingForm } from "../../../validations"

export const EditRanking = () => {
  const router = useRouter()
  const rankingId = useParam("rankingId", "number")
  const [ranking, { setQueryData }] = useQuery(getRanking, { id: rankingId })
  const [updateRankingMutation] = useMutation(updateRanking)
  const [deleteRankingItemsMutation] = useMutation(deleteRankingItems)

  return (
    <>
      <Head>
        <title>{ranking.title}を編集</title>
      </Head>

      <div>
        <h1>{ranking.title}</h1>

        <RankingForm
          submitText="更新"
          schema={UpdateRankingForm}
          initialValues={ranking}
          onSubmit={async (rankingForm) => {
            const newRanking = toUpdateRankingFromForm(ranking, rankingForm)
            const deleteItemIDList = ranking.items
              .map((item) => item.id)
              .filter((id) => !newRanking.items.map((i) => i.id).includes(id))
            try {
              await deleteRankingItemsMutation({ idList: deleteItemIDList })
              const updated = await updateRankingMutation(newRanking)
              await setQueryData(updated)
              router.push(Routes.RankingPage({ rankingId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditRankingPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRanking />
      </Suspense>

      <p>
        <Link href={Routes.RankingsPage()}>
          <a>Rankings</a>
        </Link>
      </p>
    </div>
  )
}

EditRankingPage.authenticate = true
EditRankingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRankingPage