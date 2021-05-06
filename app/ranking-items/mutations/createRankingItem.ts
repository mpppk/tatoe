import { resolver } from "blitz"
import db from "db"
import { CreateRankingItem } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateRankingItem),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const rankingItem = await db.rankingItem.create({ data: input })

    return rankingItem
  }
)
