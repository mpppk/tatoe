import { BlitzPage, Head } from "blitz"
import Layout from "../../../../../../../core/layouts/Layout"

const ComparePage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>xxx</title>
      </Head>
      Hello
    </>
  )
}

ComparePage.authenticate = true
ComparePage.getLayout = (page) => <Layout>{page}</Layout>

export default ComparePage
