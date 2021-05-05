import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetRankingItem = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRankingItem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const rankingItem = await db.rankingItem.findFirst({ where: { id } })

  if (!rankingItem) throw new NotFoundError()

  return rankingItem
})
