import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRanking = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteRanking), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const deleteRankingItems = db.rankingItem.deleteMany({
    where: { rankingId: id },
  })
  const deleteRanking = db.ranking.delete({ where: { id } })

  await db.$transaction([deleteRankingItems, deleteRanking])
})
