import * as z from "zod"

export const rankingItemSchema = z.object({
  id: z.number(),
  rankingId: z.number(),
  name: z.string(),
  rank: z.number(),
})

export type RankingItem = z.infer<typeof rankingItemSchema>
