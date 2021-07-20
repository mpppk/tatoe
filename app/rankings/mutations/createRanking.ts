import { resolver } from "blitz"
import db from "db"
import { CreateRanking } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateRanking),
  resolver.authorize(),
  async (input, ctx) => {
    return await db.ranking.create({
      data: {
        ...input,
        ownerId: ctx.session.userId,
        lastEditorId: ctx.session.userId,
        items: {
          create: input.items,
        },
      },
    })
  }
)
