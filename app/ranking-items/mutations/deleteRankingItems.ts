import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRankingItem = z
  .object({
    idList: z.number().array(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteRankingItem),
  resolver.authorize(),
  async ({ idList }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const rankingItem = await db.rankingItem.deleteMany({ where: { id: { in: idList } } })
    return rankingItem
  }
)
