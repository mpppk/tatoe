import * as z from "zod"
export const baseSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const baseSchemaKeyObject = {
  createdAt: true as const,
  updatedAt: true as const,
}

export const deleteBaseSchema = <T extends Partial<BaseModel>>(v: T): Omit<T, keyof BaseModel> => {
  const ret = { ...v }
  delete ret.createdAt
  delete ret.updatedAt
  return ret
}

export type BaseModel = z.infer<typeof baseSchema>
