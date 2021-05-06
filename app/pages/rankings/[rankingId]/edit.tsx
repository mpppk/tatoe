import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import updateRanking from "app/rankings/mutations/updateRanking"
import { RankingForm, FORM_ERROR } from "app/rankings/components/RankingForm"
import deleteRankingItems from "../../../ranking-items/mutations/deleteRankingItems"

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
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRanking}
          initialValues={ranking}
          onSubmit={async (values) => {
            const newValues = { ...values }
            delete newValues.updatedAt
            delete newValues.createdAt
            delete newValues.rankingId
            const deleteItemIDList = ranking.items
              .map((item) => item.id)
              .filter((id) => !newValues.items.map((i) => i.id).includes(id))
            try {
              await deleteRankingItemsMutation({ idList: deleteItemIDList })
              const updated = await updateRankingMutation({
                id: ranking.id,
                ...newValues,
                items: values.items.map((item, index) => {
                  const item2 = { ...item }
                  delete item2.rankingId
                  return { ...item2, rank: index + 1 }
                }),
              })
              await setQueryData(updated)
              router.push(Routes.ShowRankingPage({ rankingId: updated.id }))
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
