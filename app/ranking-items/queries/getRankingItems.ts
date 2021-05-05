import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRankingItemsInput
  extends Pick<Prisma.RankingItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRankingItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: rankingItems, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.rankingItem.count({ where }),
      query: (paginateArgs) => db.rankingItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      rankingItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
