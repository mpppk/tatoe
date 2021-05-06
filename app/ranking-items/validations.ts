import * as z from "zod"
import { baseSchema, baseSchemaKeyObject } from "../core/baseModel"

export const rankingItemSchema = z
  .object({
    id: z.number(),
    rankingId: z.number(),
    name: z.string(),
    rank: z.number(),
  })
  .merge(baseSchema)

export const CreateRankingItem = rankingItemSchema.omit({
  id: true,
  rankingId: true,
  ...baseSchemaKeyObject,
})

export const reRankItems = (items: z.infer<typeof CreateRankingItem>[]) => {
  return items.map((i, index) => ({ ...i, rank: index + 1 }))
}

export type RankingItem = z.infer<typeof rankingItemSchema>
