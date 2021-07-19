import { Link, Routes, useRouter, useSession } from "blitz"
import {
  IconButton,
  Link as MUILink,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import React from "react"
import { CompareListItemProps, RankingItemCard } from "./RankingItemCard"
import { Ranking as RankingType } from "../validations"
import { RankingItem } from "../../ranking-items/validations"
import { User } from "../../../types"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import LockIcon from "@material-ui/icons/Lock"
import { useAnchor } from "../../core/hooks/useAnchor"

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

type Props = Pick<
  RankingType,
  "id" | "title" | "description" | "canBeEditedByAnotherUser" | "source" | "owner"
> & {
  items: Pick<RankingItem, "id" | "title" | "subtitle">[]
  rankings: RankingType[]
  onClickDeleteButton: () => void
}

const toCompares = (
  rankings: RankingType[],
  index: number,
  orgRankingId: number,
  orgItemId: number
): CompareListItemProps[] => {
  return rankings
    .map((ranking) => {
      const cItemId = ranking.items?.[index]?.id ?? 0
      const cItemName = ranking.items?.[index]?.title ?? ""
      const href = Routes.ComparePage({
        rankingId: orgRankingId,
        cRankingId: ranking.id,
        itemId: orgItemId,
        cItemId,
      })
      return {
        cRankingName: ranking.title,
        cItemId,
        cItemName,
        href,
      }
    })
    .filter((c) => c.cItemName !== "")
}

interface RankingMenuProps {
  anchorEl: HTMLElement | null
  rankingId: number
  showDelete: boolean
  onClickEdit: () => void
  onClickDelete: () => void
  onClose: () => void
}

const RankingMenu: React.FC<RankingMenuProps> = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted={true}
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
    >
      <MenuItem onClick={props.onClickEdit}>Edit</MenuItem>
      {props.showDelete ? <MenuItem onClick={props.onClickDelete}>Delete</MenuItem> : null}
    </Menu>
  )
}

interface RankingMoreHoriz {
  rankingId: number
  showDelete: boolean
  onClickMenuDelete: () => void
}

const RankingMoreHoriz: React.FC<RankingMoreHoriz> = (props) => {
  const router = useRouter()
  const { anchorEl, setClickedElAsAnchor, clearAnchor } = useAnchor()
  const handleEdit = () => {
    clearAnchor()
    router.push(Routes.EditRankingPage({ rankingId: props.rankingId }))
  }
  const handleDelete = () => {
    clearAnchor()
    props.onClickMenuDelete()
  }
  return (
    <>
      <IconButton onClick={setClickedElAsAnchor}>
        <MoreHorizIcon />
      </IconButton>
      <RankingMenu
        anchorEl={anchorEl}
        rankingId={props.rankingId}
        showDelete={props.showDelete}
        onClickEdit={handleEdit}
        onClickDelete={handleDelete}
        onClose={clearAnchor}
      />
    </>
  )
}

export const Ranking: React.FC<Props> = (props) => {
  const classes = useStyles()
  const session = useSession()
  const isOwnRanking = props.owner.id === session.userId
  const showMoreHoriz = isOwnRanking || props.canBeEditedByAnotherUser
  const showLockIcon = isOwnRanking && !props.canBeEditedByAnotherUser
  return (
    <>
      <Typography variant={"h5"}>
        {showLockIcon ? <LockIcon /> : null}
        {props.title}
        {showMoreHoriz ? (
          <RankingMoreHoriz
            showDelete={isOwnRanking}
            rankingId={props.id}
            onClickMenuDelete={props.onClickDeleteButton}
          />
        ) : null}
      </Typography>
      <Typography className={classes.description} variant={"subtitle1"}>
        {props.description}
      </Typography>
      {props.items.map((item, rank) => (
        <RankingItemCard
          key={item.id}
          defaultExpand={rank === 0}
          title={item.title}
          rank={rank + 1}
          subheader={item.subtitle ?? ""}
          compares={toCompares(props.rankings, rank, props.id, item.id)}
        />
      ))}
      <Typography className={classes.description} variant={"subtitle1"}>
        <MUILink href={props.source ?? "#"}>引用元</MUILink>
      </Typography>
      <RankingFooter
        onClickDeleteButton={props.onClickDeleteButton}
        rankingId={props.id}
        owner={props.owner}
      />
    </>
  )
}

interface RankingFooterProps {
  rankingId: number
  owner: User
  onClickDeleteButton: (rankingId: number) => void
}

export const RankingFooter: React.FC<RankingFooterProps> = (props) => {
  return (
    <>
      <Typography variant={"body1"}>
        Created by{" "}
        <Link href={Routes.UserPage({ userId: props.owner.id })}>
          <MUILink>{props.owner.name}</MUILink>
        </Link>
      </Typography>
      <Typography variant={"body1"}>
        Updated by <MUILink>User2</MUILink>
      </Typography>
    </>
  )
}
