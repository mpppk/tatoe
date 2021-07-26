import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetRanking = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRanking), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const ranking = await db.ranking.findFirst({
    where: { id },
    include: { items: true, owner: true, lastEditor: true },
  })

  if (!ranking) throw new NotFoundError()

  return ranking
})
