import { resolver } from "blitz"
import db from "db"
import { UpdateRanking } from "../validations"

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
