import { BlitzPage, useParams, useQuery, Link, useRouter, Routes } from "blitz"
import Meta from "../../../../../../../../components/Meta"
import Layout from "../../../../../../../../core/layouts/Layout"
import getRanking from "../../../../../../../queries/getRanking"
import React, { Suspense } from "react"
import { Button, makeStyles, Typography } from "@material-ui/core"
import TwitterIcon from "@material-ui/icons/Twitter"
import { RankingItem } from "../../../../../../../../ranking-items/validations"
import { AppLink } from "../../../../../../../../core/components/AppLink"
import { Skeleton } from "@material-ui/lab"

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
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  tweetButton: {
    width: "36%",
  },
  tweetCard: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: "4px",
    fontSize: "16px",
    boxShadow: "1px 1px 2px rgba(0,0,0,.3)",
  },
  tweetText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  subHeader: {
    marginTop: theme.spacing(1),
  },
  itemInfoWrapper: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "12px",
  },
  itemInfoTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  },
  itemSubTitle: {
    fontStyle: "oblique",
    // color: "gray",
  },
}))

interface TweetButtonProps {
  text: string
  disabled?: boolean
}

const TweetButton: React.FC<TweetButtonProps> = (props) => {
  const classes = useStyles()
  const baseTwitterUrl = "https://twitter.com/intent/tweet"
  const href = baseTwitterUrl + "?text=" + props.text
  return (
    <Link href={href}>
      <Button
        disabled={props.disabled}
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

interface RankingLinkProps {
  id: number
  title: string
}

const RankingLink: React.FC<RankingLinkProps> = (props) => {
  return (
    <>
      <AppLink href={Routes.RankingPage({ rankingId: props.id })}>{props.title}</AppLink>
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
      <AppLink href={Routes.RankingPage({ rankingId: props.rankingId })}>{props.title}</AppLink>
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
  const classes = useStyles()
  return (
    <div className={classes.tweetCard}>
      <Typography className={classes.tweetText}>
        <RankingLink id={props.rankingId} title={props.rankingTitle} />の
        <RankingItemLink rankingId={props.rankingId} title={props.itemTitle} />を
        <RankingLink id={props.cRankingId} title={props.cRankingTitle} />
        で例えると
        <RankingItemLink rankingId={props.cRankingId} title={props.cItemTitle} />
        ぐらいです
      </Typography>
    </div>
  )
}

interface RankingItemProps {
  rankingId: number
  rankingTitle: string
  item: Pick<RankingItem, "id" | "title" | "subtitle" | "rank">
}

const RankingItemInfo: React.FC<RankingItemProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.itemInfoWrapper}>
        <Typography className={classes.itemInfoTitle}>{props.item.title}</Typography>
        <RankingLink id={props.rankingId} title={props.rankingTitle} />の{props.item.rank}位(
        <span className={classes.itemSubTitle}>{props.item.subtitle}</span>)
      </div>
    </>
  )
}

const RankingItemInfoSkeleton = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.itemInfoWrapper}>
        <Typography className={classes.itemInfoTitle}>
          <Skeleton width={"40%"} />
        </Typography>
        <Skeleton variant={"text"} />
      </div>
    </>
  )
}

const Compare: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const params = useAppParams()
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
  const title = item && cRanking ? `${item.title}を${cRanking.title}で例える` : ""

  if (!ranking || !item || !cRanking || !cItem) {
    return null
  }

  return (
    <>
      <Meta title={title} />
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
      <div className={classes.tweetButtonWrapper}>
        <TweetButton text={tweetText} />
      </div>
      <RankingItemInfo rankingId={ranking.id} rankingTitle={ranking.title} item={item} />
      <RankingItemInfo rankingId={cRanking.id} rankingTitle={cRanking.title} item={cItem} />
    </>
  )
}

const CompareSkeleton = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.tweetCard}>
        <Typography className={classes.tweetText}>
          <Skeleton />
        </Typography>
        <Typography className={classes.tweetText}>
          <Skeleton />
        </Typography>
      </div>
      <div className={classes.tweetButtonWrapper}>
        <TweetButton text={""} disabled={true} />
      </div>
      <RankingItemInfoSkeleton />
      <RankingItemInfoSkeleton />
    </>
  )
}

const ComparePage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<CompareSkeleton />}>
        <Compare />
      </Suspense>
    </>
  )
}

ComparePage.getLayout = (page) => <Layout>{page}</Layout>

export default ComparePage
