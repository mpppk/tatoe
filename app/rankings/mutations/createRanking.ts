import { resolver } from "blitz"
import db from "db"
import { CreateRanking } from "../validations"

export default resolver.pipe(resolver.zod(CreateRanking), resolver.authorize(), async (input) => {
  return await db.ranking.create({
    data: {
      ...input,
      items: {
        create: input.items,
      },
    },
  })
})
