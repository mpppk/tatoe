import { Routes, useRouter, useSession } from "blitz"
import {
  ClickAwayListener,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
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
import { AppLink } from "app/core/components/AppLink"
import { SourceLink } from "./SourceLink"
import { Skeleton } from "@material-ui/lab"

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
  lockIcon: {
    verticalAlign: "middle",
  },
  skeletonWrapper: {
    padding: theme.spacing(1),
  },
}))

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

const Lock: React.FC = () => {
  const classes = useStyles()
  const [openCheckBoxToolTip, setOpenCheckBoxToolTip] = React.useState(false)
  return (
    <ClickAwayListener onClickAway={setOpenCheckBoxToolTip.bind(null, false)}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={setOpenCheckBoxToolTip.bind(null, false)}
        open={openCheckBoxToolTip}
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="このランキングはあなただけが編集できます"
      >
        <LockIcon onClick={setOpenCheckBoxToolTip.bind(null, true)} className={classes.lockIcon} />
      </Tooltip>
    </ClickAwayListener>
  )
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

type Props = Pick<
  RankingType,
  "id" | "title" | "description" | "canBeEditedByAnotherUser" | "source" | "owner" | "lastEditor"
> & {
  items: Pick<RankingItem, "id" | "title" | "subtitle">[]
  rankings: RankingType[]
  onClickDeleteButton: () => void
}

export const RankingSkeleton: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Typography variant={"h5"}>
        <Skeleton />
      </Typography>
      <Typography className={classes.description} variant={"subtitle1"}>
        <Skeleton />
      </Typography>
      {Array(3)
        .fill(undefined)
        .map((_, i) => (
          <div key={"ranking_skeleton" + i} className={classes.skeletonWrapper}>
            <Skeleton variant={"rect"} height={192} />
          </div>
        ))}
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
        {showLockIcon ? <Lock /> : null}
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
      <SourceLink source={props.source} />
      <RankingFooter
        onClickDeleteButton={props.onClickDeleteButton}
        rankingId={props.id}
        owner={props.owner}
        lastEditor={props.lastEditor}
      />
    </>
  )
}

interface RankingFooterProps {
  rankingId: number
  owner: User
  lastEditor: User
  onClickDeleteButton: (rankingId: number) => void
}

export const RankingFooter: React.FC<RankingFooterProps> = (props) => {
  return (
    <>
      <Typography variant={"body1"}>
        Created by{" "}
        <AppLink href={Routes.UserPage({ userId: props.owner.id })}>{props.owner.name}</AppLink>
      </Typography>
      <Typography variant={"body1"}>
        Updated by{" "}
        <AppLink href={Routes.UserPage({ userId: props.lastEditor.id })}>
          {props.lastEditor.name}
        </AppLink>
      </Typography>
    </>
  )
}
