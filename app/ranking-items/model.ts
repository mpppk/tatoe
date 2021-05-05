import * as z from "zod"

export const rankingItemSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type RankingItem = z.infer<typeof rankingItemSchema>
