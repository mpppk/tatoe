import { AuthorizationError, resolver } from "blitz"
import db from "db"
import { UpdateRanking } from "../validations"

const isEditableRankingResolver = async (input, ctx) => {
  const ranking = await db.ranking.findUnique({ where: { id: input.id } })
  if (ranking === null) {
    throw new AuthorizationError()
  }
  if (!ranking.canBeEditedByAnotherUser && ctx.session.userId !== ranking.ownerId) {
    throw new AuthorizationError()
  }
  return input
}

export default resolver.pipe(
  resolver.zod(UpdateRanking),
  resolver.authorize(),
  isEditableRankingResolver,
  async ({ id, ...data }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ranking = await db.ranking.findUnique({ where: { id } })
    return await db.ranking.update({
      where: { id },
      include: { items: true, owner: true, lastEditor: true },
      data: {
        ...data,
        // owner以外は変更できない。Owner以外が編集できている場合は必ずtrue
        canBeEditedByAnotherUser:
          ranking?.ownerId === ctx.session.userId ? data.canBeEditedByAnotherUser : true,
        items: {
          upsert: data.items.map((item) => ({
            where: { id: item.id || 0 },
            create: item,
            update: item,
          })),
        },
        lastEditorId: ctx.session.userId,
      },
    })
  }
)
