import { AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRanking = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteRanking),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const ranking = await db.ranking.findUnique({ where: { id } })
    if (!ranking) {
      throw new NotFoundError(`ranking(id: ${id}) does not found`)
    }
    if (ranking.ownerId !== ctx.session.userId) {
      throw new AuthorizationError()
    }

    const deleteRankingItems = db.rankingItem.deleteMany({
      where: { rankingId: id },
    })
    const deleteRanking = db.ranking.delete({ where: { id } })

    await db.$transaction([deleteRankingItems, deleteRanking])
  }
)
