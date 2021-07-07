import { BlitzPage, useParam, useQuery } from "blitz"
import React from "react"
import getUser from "../../queries/getUser"
import Layout from "../../../core/layouts/Layout"
import { Typography } from "@material-ui/core"
import { RankingList } from "../../../rankings/components/RankingList"

const UserPage: BlitzPage = () => {
  const userId = useParam("userId", "string") as string
  const [user] = useQuery(getUser, userId)

  return (
    <>
      <Typography variant={"h4"}>{user.name}</Typography>
      <Typography variant={"h5"}>作ったランキング</Typography>
      <RankingList rankings={user.rankings} />
    </>
  )
}

UserPage.getLayout = (page) => <Layout>{page}</Layout>
export default UserPage
