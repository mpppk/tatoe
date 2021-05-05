import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRanking = z
  .object({
    title: z.string(),
    description: z.string(),
    items: z.array(z.object({ name: z.string() })),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateRanking), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const ranking = await db.ranking.create({
    data: {
      ...input,
      items: { create: input.items.map((i, index) => ({ ...i, rank: index + 1 })) },
    },
  })

  return ranking
})
