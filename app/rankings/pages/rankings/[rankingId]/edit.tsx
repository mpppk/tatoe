import React, { Suspense } from "react"
import { useRouter, useQuery, useMutation, useParam, BlitzPage, Routes, useSession } from "blitz"
import Meta from "../../../../components/Meta"
import Layout from "app/core/layouts/Layout"
import getRanking from "app/rankings/queries/getRanking"
import updateRanking from "app/rankings/mutations/updateRanking"
import { RankingForm } from "app/rankings/components/RankingForm"
import deleteRankingItems from "../../../../ranking-items/mutations/deleteRankingItems"
import { toUpdateRankingFromForm, UpdateRankingForm } from "../../../validations"
import { FORM_ERROR } from "final-form"
import { Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

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
        <Typography variant={"h5"}>{ranking.title}</Typography>

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

const EditRankingContentsSkeleton = () => {
  return (
    <div>
      <Typography variant={"h5"}>
        <Skeleton />
      </Typography>
      <Skeleton variant="rect" height={300} />
    </div>
  )
}

const EditRankingPageContents = () => {
  const session = useSession()
  const rankingId = useParam("rankingId", "number")
  const [ranking] = useQuery(getRanking, { id: rankingId })
  const canEdit = ranking.canBeEditedByAnotherUser || session.userId === ranking.ownerId
  return (
    <div>
      {canEdit ? (
        <EditRanking disableToChangeEditability={session.userId !== ranking.ownerId} />
      ) : (
        <DisallowEditing />
      )}
    </div>
  )
}

const EditRankingPage: BlitzPage = () => {
  return (
    <Suspense fallback={<EditRankingContentsSkeleton />}>
      <EditRankingPageContents />
    </Suspense>
  )
}

EditRankingPage.authenticate = true
EditRankingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRankingPage
