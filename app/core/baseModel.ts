import * as z from "zod"
export const baseSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const baseSchemaKeyObject = {
  createdAt: true as const,
  updatedAt: true as const,
}

export type BaseModel = z.infer<typeof baseSchema>
