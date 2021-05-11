import { Link, Routes } from "blitz"
import { Button, Link as MUILink, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { CompareListItemProps, RankingItemCard } from "./RankingItemCard"
import { Ranking as RankingType } from "../validations"
import { RankingItem } from "../../ranking-items/validations"

const useStyles = makeStyles((theme) => ({
  description: {
    overflowWrap: "break-word",
  },
  buttonsWrapper: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  editButton: {
    marginRight: theme.spacing(1),
  },
}))

type Props = Pick<RankingType, "id" | "title" | "description"> & {
  items: Pick<RankingItem, "id" | "title" | "subtitle">[]
  rankings: RankingType[]
  onClickDeleteButton: (rankingId: number) => void
}

const toCompares = (rankings: RankingType[], index: number): CompareListItemProps[] => {
  return rankings
    .map((ranking) => {
      return {
        rankingName: ranking.title,
        itemName: ranking.items?.[index]?.title ?? "",
        url: "/",
      }
    })
    .filter((c) => c.itemName !== "")
}

export const Ranking: React.FC<Props> = (props) => {
  const classes = useStyles()
  console.log(props.rankings)
  return (
    <>
      <Typography variant={"h5"}>{props.title}</Typography>
      <Typography className={classes.description} variant={"subtitle1"}>
        {props.description}
      </Typography>
      {props.items.map((item, rank) => (
        <RankingItemCard
          key={item.id}
          title={item.title}
          rank={rank + 1}
          subheader={item.subtitle ?? ""}
          compares={toCompares(props.rankings, rank)}
        />
      ))}
      <RankingFooter onClickDeleteButton={props.onClickDeleteButton} rankingId={props.id} />
    </>
  )
}

interface RankingFooterProps {
  rankingId: number
  onClickDeleteButton: (rankingId: number) => void
}
export const RankingFooter: React.FC<RankingFooterProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <Link href={Routes.EditRankingPage({ rankingId: props.rankingId })}>
        <div className={classes.buttonsWrapper}>
          <Button className={classes.editButton} color={"inherit"} variant={"contained"}>
            Edit
          </Button>
          <Button
            color={"secondary"}
            variant={"contained"}
            onClick={props.onClickDeleteButton.bind(null, props.rankingId)}
          >
            Delete
          </Button>
        </div>
      </Link>
      <Typography variant={"body1"}>
        Created by <MUILink>User1</MUILink>
      </Typography>
      <Typography variant={"body1"}>
        Updated by <MUILink>User2</MUILink>
      </Typography>
    </>
  )
}
