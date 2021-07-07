import { BlitzPage, Link, Routes, useParam, useQuery } from "blitz"
import React from "react"
import getUser from "../../queries/getUser"
import Layout from "../../../core/layouts/Layout"
import { Link as MUILink, Typography } from "@material-ui/core"

interface RankingLinkProps {
  rankingId: number
  rankingTitle: string
}
const RankingLink: React.FC<RankingLinkProps> = (props) => {
  return (
    <Link href={Routes.ShowRankingPage({ rankingId: props.rankingId })}>
      <MUILink>{props.rankingTitle}</MUILink>
    </Link>
  )
}

const UserPage: BlitzPage = () => {
  const userId = useParam("userId", "string") as string
  const [user] = useQuery(getUser, userId)

  return (
    <>
      <Typography variant={"h5"}>基本情報</Typography>
      <div>id: {user.id}</div>
      <div>name: {user.name}</div>
      <Typography variant={"h5"}>作ったランキング</Typography>
      {user.rankings.map((r) => (
        <RankingLink key={r.id} rankingId={r.id} rankingTitle={r.title} />
      ))}
    </>
  )
}

UserPage.getLayout = (page) => <Layout>{page}</Layout>
export default UserPage
