import * as z from "zod"
export const baseSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type BaseModel = z.infer<typeof baseSchema>
