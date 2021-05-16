import { BlitzPage, Head, useParams, useQuery, Link, useRouter, Routes } from "blitz"
import Layout from "../../../../../../../core/layouts/Layout"
import getRanking from "../../../../../../../rankings/queries/getRanking"
import React, { useEffect, Suspense } from "react"
import { Button, makeStyles, Typography, Link as MUILink } from "@material-ui/core"
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

interface AppLinkProps {
  href: string | ReturnType<typeof Routes.RankingsPage>
}

const AppLink: React.FC<AppLinkProps> = (props) => {
  return (
    <Link href={props.href}>
      <MUILink>{props.children}</MUILink>
    </Link>
  )
}

interface RankingLinkProps {
  id: number
  title: string
}

const RankingLink: React.FC<RankingLinkProps> = (props) => {
  return (
    <>
      <AppLink href={Routes.ShowRankingPage({ rankingId: props.id })}>{props.title}</AppLink>
    </>
  )
}

interface RankingItemLinkProps {
  rankingId: number
  title: string
}

const RankingItemLink: React.FC<RankingItemLinkProps> = (props) => {
  return (
    <>
      <AppLink href={Routes.ShowRankingPage({ rankingId: props.rankingId })}>{props.title}</AppLink>
    </>
  )
}

interface CompareTextProps {
  rankingId: number
  rankingTitle: string
  itemId: number
  itemTitle: string
  cRankingId: number
  cRankingTitle: string
  cItemId: number
  cItemTitle: string
}

const CompareText: React.FC<CompareTextProps> = (props) => {
  return (
    <Typography variant={"h5"}>
      <RankingLink id={props.rankingId} title={props.rankingTitle} />の
      <RankingItemLink rankingId={props.rankingId} title={props.itemTitle} />を
      <RankingLink id={props.cRankingId} title={props.cRankingTitle} />
      で例えると
      <RankingItemLink rankingId={props.cRankingId} title={props.cItemTitle} />
      ぐらいです
    </Typography>
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
      {ranking && item && cRanking && cItem ? (
        <CompareText
          rankingId={ranking.id}
          rankingTitle={ranking.title}
          itemId={item.id}
          itemTitle={item.title}
          cRankingId={cRanking.id}
          cRankingTitle={cRanking.title}
          cItemId={cItem.id}
          cItemTitle={cItem.title}
        />
      ) : null}
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
