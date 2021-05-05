import * as z from "zod"
import { baseSchema } from "../core/baseModel"
import { rankingItemSchema } from "../ranking-items/model"

export const rankingSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    items: rankingItemSchema.array(),
  })
  .merge(baseSchema)

export type Ranking = z.infer<typeof rankingSchema>
export type ShallowRanking = Omit<Ranking, "items">
