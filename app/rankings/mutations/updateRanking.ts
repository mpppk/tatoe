import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateRanking = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRanking),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ranking = await db.ranking.update({ where: { id }, data })

    return ranking
  }
)
