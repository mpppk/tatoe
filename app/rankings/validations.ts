import * as z from "zod"
import { baseSchema, baseSchemaKeyObject } from "../core/baseModel"
import { CreateRankingItem, rankingItemSchema } from "../ranking-items/validations"

export const rankingSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    items: rankingItemSchema.array(),
  })
  .merge(baseSchema)

export const CreateRanking = rankingSchema
  .omit({
    id: true,
    ...baseSchemaKeyObject,
  })
  .extend({
    items: CreateRankingItem.array(),
  })

export type Ranking = z.infer<typeof rankingSchema>
export type ShallowRanking = Omit<Ranking, "items">
