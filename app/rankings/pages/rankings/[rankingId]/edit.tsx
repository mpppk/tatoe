import React, { Suspense } from "react"
import {
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  useSession,
} from "blitz"
import Loading from "app/components/Loading"
import Meta from "../../../../components/Meta"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import updateRanking from "app/rankings/mutations/updateRanking"
import { RankingForm } from "app/rankings/components/RankingForm"
import deleteRankingItems from "../../../../ranking-items/mutations/deleteRankingItems"
import { toUpdateRankingFromForm, UpdateRankingForm } from "../../../validations"
import { FORM_ERROR } from "final-form"

interface Props {
  disableToChangeEditability: boolean
}

export const EditRanking: React.FC<Props> = (props) => {
  const router = useRouter()
  const rankingId = useParam("rankingId", "number")
  const [ranking, { setQueryData }] = useQuery(getRanking, { id: rankingId })
  const [updateRankingMutation] = useMutation(updateRanking)
  const [deleteRankingItemsMutation] = useMutation(deleteRankingItems)

  return (
    <>
      <Meta title={`${ranking.title}を編集`} />
      <div>
        <h1>{ranking.title}</h1>

        <RankingForm
          mode="edit"
          disableToChangeEditability={props.disableToChangeEditability}
          initialValues={UpdateRankingForm.parse(ranking)}
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

const DisallowEditing = () => {
  return <>このランキングの編集は許可されていません</>
}

const EditRankingPage: BlitzPage = () => {
  const session = useSession()
  const rankingId = useParam("rankingId", "number")
  const [ranking] = useQuery(getRanking, { id: rankingId })
  const canEdit = ranking.canBeEditedByAnotherUser || session.userId === ranking.ownerId
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {canEdit ? (
          <EditRanking disableToChangeEditability={session.userId !== ranking.ownerId} />
        ) : (
          <DisallowEditing />
        )}
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
