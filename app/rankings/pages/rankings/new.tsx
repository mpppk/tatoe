import { useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRanking from "app/rankings/mutations/createRanking"
import { RankingForm } from "app/rankings/components/RankingForm"
import { Typography } from "@material-ui/core"
import { reRankItems } from "../../../ranking-items/validations"
import { useCallback } from "react"
import { FORM_ERROR } from "final-form"
import Meta from "app/components/Meta"

const NewRankingPage: BlitzPage = () => {
  const router = useRouter()
  const [createRankingMutation] = useMutation(createRanking)

  const handleSubmit = useCallback(
    async (rankingForm) => {
      try {
        const ranking = await createRankingMutation({
          ...rankingForm,
          source: rankingForm.source ?? null,
          items: reRankItems(rankingForm.items),
        })
        router.push(`/rankings/${ranking.id}`)
      } catch (error) {
        console.error(error)
        return {
          [FORM_ERROR]: error.toString(),
        }
      }
    },
    [router, createRankingMutation]
  )

  return (
    <div>
      <Meta title="ランキングを作る" />
      <Typography variant={"h5"} gutterBottom>
        ランキングを作る
      </Typography>

      <RankingForm
        mode="new"
        disableToChangeEditability={false}
        initialValues={{
          canBeEditedByAnotherUser: true,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

NewRankingPage.authenticate = true
NewRankingPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewRankingPage
