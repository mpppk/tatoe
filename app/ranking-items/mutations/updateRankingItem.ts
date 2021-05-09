import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateRankingItem = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRankingItem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const rankingItem = await db.rankingItem.update({ where: { id }, data })

    return rankingItem
  }
)
