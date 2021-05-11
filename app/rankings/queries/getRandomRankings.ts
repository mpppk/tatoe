import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const GetRankings = z.object({
  take: z.number().positive().optional(),
  ignoreID: z.number().positive().optional(),
})

export default resolver.pipe(
  resolver.zod(GetRankings),
  resolver.authorize(),
  async ({ take = 10, ignoreID }) => {
    const count = await db.ranking.count()
    const idList: number[] = []

    if (count <= 3) {
      throw new Error("too few rankings: " + count)
    }

    let tryNum = 0
    while (idList.length < 3) {
      if (tryNum > 1000) {
        throw new Error("max try reached: " + tryNum)
      }
      const id = getRandomInt(count) + 1
      if (id !== ignoreID && !idList.includes(id)) {
        idList.push(id)
      }
    }

    const OR = idList.map((id) => ({ id }))
    const rankings = await db.ranking.findMany({
      where: { OR },
      include: { items: true },
    })
    rankings.forEach((ranking) => ranking.items.sort((a, b) => a.rank - b.rank))
    return rankings
  }
)
