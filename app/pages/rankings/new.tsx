import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRanking from "app/rankings/mutations/createRanking"
import { RankingForm, FORM_ERROR } from "app/rankings/components/RankingForm"
import { Typography } from "@material-ui/core"

const NewRankingPage: BlitzPage = () => {
  const router = useRouter()
  const [createRankingMutation] = useMutation(createRanking)

  return (
    <div>
      <Typography variant={"h5"} gutterBottom>
        ランキングを作る
      </Typography>
      {/*<h1>Create New Ranking</h1>*/}

      <RankingForm
        submitText="作成"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRanking}
        initialValues={{ items: [] }}
        onSubmit={async (values) => {
          console.log("values", values)
          try {
            const ranking = await createRankingMutation(values)
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
