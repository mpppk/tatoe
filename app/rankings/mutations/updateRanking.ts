import { resolver } from "blitz"
import db from "db"
import * as z from "zod"
import { rankingSchema } from "../model"
import { rankingItemSchema } from "../../ranking-items/model"

const itemsSchema = rankingItemSchema
  .extend({
    id: rankingItemSchema.shape.id.optional(),
    rankingId: rankingItemSchema.shape.rankingId.optional(),
  })
  .nonstrict()
  .array()

const UpdateRanking = rankingSchema
  .extend({ id: z.number().optional(), items: itemsSchema })
  .omit({ updatedAt: true, createdAt: true })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRanking),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ranking = await db.ranking.update({
      where: { id },
      include: { items: true },
      data: {
        ...data,
        items: {
          upsert: data.items.map((item) => ({
            where: { id: item.id || 0 },
            create: item,
            update: item,
          })),
        },
      },
    })

    return ranking
  }
)
