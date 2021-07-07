import { List } from "@material-ui/core"
import { LinkListItem } from "../../core/components/LinkListItem"
import { Routes } from "blitz"
import React from "react"

interface Ranking {
  id: number
  title: string
}

interface Props {
  rankings: Ranking[]
}
export const RankingList: React.FC<Props> = (props) => {
  return (
    <List dense={true}>
      {props.rankings.map((ranking) => (
        <LinkListItem
          key={ranking.id}
          href={Routes.ShowRankingPage({ rankingId: ranking.id })}
          text={ranking.title}
        />
      ))}
    </List>
  )
}
