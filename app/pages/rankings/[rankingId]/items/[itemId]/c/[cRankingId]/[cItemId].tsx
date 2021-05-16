import { BlitzPage, Head, useParams, useQuery, Link, useRouter } from "blitz"
import Layout from "../../../../../../../core/layouts/Layout"
import getRanking from "../../../../../../../rankings/queries/getRanking"
import React, { useEffect, Suspense } from "react"
import { Button, makeStyles, Typography } from "@material-ui/core"
import TwitterIcon from "@material-ui/icons/Twitter"

interface Params {
  rankingId: number
  itemId: number
  cRankingId: number
  cItemId: number
}

const useAppParams = (): Partial<Params> => {
  return useParams("number")
}

const useStyles = makeStyles((theme) => ({
  tweetButtonWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
  tweetButton: {
    backgroundColor: "#00acee",
  },
  subHeader: {
    marginTop: theme.spacing(1),
  },
}))

interface TweetButtonProps {
  text: string
}

const TweetButton: React.FC<TweetButtonProps> = (props) => {
  const classes = useStyles()
  const baseTwitterUrl = "https://twitter.com/intent/tweet"
  const href = baseTwitterUrl + "?text=" + props.text
  return (
    <Link href={href}>
      <Button
        className={classes.tweetButton}
        startIcon={<TwitterIcon />}
        color="primary"
        variant={"contained"}
      >
        Tweet
      </Button>
    </Link>
  )
}

const Compare: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const params = useAppParams()
  useEffect(() => {}, [params.rankingId, params.itemId, params.cRankingId, params.cItemId])
  const [ranking] = useQuery(
    getRanking,
    { id: params.rankingId },
    { enabled: params.rankingId !== undefined }
  )
  const [cRanking] = useQuery(
    getRanking,
    { id: params.cRankingId },
    { enabled: params.cRankingId !== undefined }
  )
  const item =
    ranking && params.itemId ? ranking.items.find((item) => item.id === params.itemId) : undefined
  const cItem =
    cRanking && params.cItemId
      ? cRanking.items.find((item) => item.id === params.cItemId)
      : undefined
  const text = `「${ranking?.title}」の「${item?.title}」を「${cRanking?.title}」で例えると「${cItem?.title}」ぐらいです`
  const tweetText = text + "\nhttps://tatoe.nibo.sh" + router.asPath
  console.log("tweet", tweetText)
  return (
    <>
      <Head>
        <title>xxx</title>
      </Head>
      <Typography variant={"h5"}>
        「{ranking?.title}」の「{item?.title}」を「{cRanking?.title}」で例えると「{cItem?.title}
        」ぐらいです
      </Typography>
      <div className={classes.tweetButtonWrapper}>
        <TweetButton text={tweetText} />
      </div>
    </>
  )
}

const ComparePage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>xxx</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <Compare />
      </Suspense>
    </>
  )
}

ComparePage.authenticate = true
ComparePage.getLayout = (page) => <Layout>{page}</Layout>

export default ComparePage
