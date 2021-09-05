import { BlitzPage, useParam, useQuery } from "blitz"
import React, { Suspense } from "react"
import Meta from "../../../components/Meta"
import getUser from "../../queries/getUser"
import Layout from "../../../core/layouts/Layout"
import { Typography } from "@material-ui/core"
import { RankingList } from "../../../rankings/components/RankingList"
import { RankingsSkeleton } from "../../../rankings/components/RankingsSkeleton"
import { Skeleton } from "@material-ui/lab"

const UserInfoSkeleton = () => {
  return (
    <>
      <Typography variant={"h4"}>
        <Skeleton />
      </Typography>
      <Typography variant={"h5"}>作ったランキング</Typography>
      <RankingsSkeleton length={5} />
    </>
  )
}

const UserInfo = () => {
  const userId = useParam("userId", "string") as string
  const [user] = useQuery(getUser, userId)

  return (
    <>
      <Meta title={user.name} />
      <Typography variant={"h4"}>{user.name}</Typography>
      <Typography variant={"h5"}>作ったランキング</Typography>
      <RankingList rankings={user.rankings} />
    </>
  )
}

const UserPage: BlitzPage = () => {
  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <UserInfo />
    </Suspense>
  )
}

UserPage.getLayout = (page) => <Layout>{page}</Layout>
export default UserPage
