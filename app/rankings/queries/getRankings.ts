import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"
import * as z from "zod"

const GetRankings = z.object({
  take: z.number().positive().optional(),
  skip: z.number().nonnegative().optional(),
})

export default resolver.pipe(
  resolver.zod(GetRankings),
  resolver.authorize(),
  async ({ skip = 0, take = 10 }) => {
    const orderBy: Prisma.RankingFindManyArgs["orderBy"] = { id: "desc" }
    const where = {}
    const {
      items: rankings,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.ranking.count({ where }),
      query: (paginateArgs) =>
        db.ranking.findMany({
          ...paginateArgs,
          orderBy,
        }),
    })

    return {
      rankings,
      nextPage,
      hasMore,
      count,
    }
  }
)
