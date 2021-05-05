import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRankingItem = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteRankingItem),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const rankingItem = await db.rankingItem.deleteMany({ where: { id } })

    return rankingItem
  }
)
