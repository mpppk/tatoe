import { useRouter, useMutation, BlitzPage, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRanking from "app/rankings/mutations/createRanking"
import { RankingForm, FORM_ERROR } from "app/rankings/components/RankingForm"
import { Typography } from "@material-ui/core"
import { CreateRankingForm } from "../../rankings/validations"
import { reRankItems } from "../../ranking-items/validations"

const NewRankingPage: BlitzPage = () => {
  const router = useRouter()
  const [createRankingMutation] = useMutation(createRanking)
  const session = useSession()

  return (
    <div>
      <Typography variant={"h5"} gutterBottom>
        ランキングを作る
      </Typography>

      <RankingForm
        submitText="作成"
        schema={CreateRankingForm}
        initialValues={{ ownerId: session.userId!, items: [{ title: "" }] }}
        onSubmit={async (rankingForm) => {
          try {
            const ranking = await createRankingMutation({
              ...rankingForm,
              items: reRankItems(rankingForm.items),
            })
            router.push(`/rankings/${ranking.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewRankingPage.authenticate = true
NewRankingPage.getLayout = (page) => <Layout title={"ランキングを作る"}>{page}</Layout>

export default NewRankingPage
