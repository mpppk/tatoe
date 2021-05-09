import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRankingsInput
  extends Pick<Prisma.RankingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRankingsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: rankings, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.ranking.count({ where }),
      query: (paginateArgs) => db.ranking.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      rankings,
      nextPage,
      hasMore,
      count,
    }
  }
)
