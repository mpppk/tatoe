import * as z from "zod"
import { baseSchema, baseSchemaKeyObject, deleteBaseSchema } from "../core/baseModel"
import {
  CreateRankingItem,
  rankingItemSchema,
  toUpdateRankingItemsFromForms,
  UpdateRankingItem,
  UpdateRankingItemForm,
} from "../ranking-items/validations"

export const rankingSchema = z
  .object({
    id: z.number().positive(),
    title: z.string(),
    description: z.string(),
    note: z.string().nullable(),
    items: rankingItemSchema.array().min(1),
  })
  .merge(baseSchema)

export const CreateRanking = rankingSchema
  .omit({
    id: true,
    ...baseSchemaKeyObject,
  })
  .extend({
    items: CreateRankingItem.array().min(1),
  })
export type CreateRankingModel = z.infer<typeof CreateRanking>

export const UpdateRanking = rankingSchema
  .extend({ items: UpdateRankingItem.array() })
  .omit(baseSchemaKeyObject)

export const UpdateRankingForm = rankingSchema.partial().extend({
  title: rankingSchema.shape.title,
  description: rankingSchema.shape.description,
  note: rankingSchema.shape.note,
  items: UpdateRankingItemForm.array(),
})

export const toUpdateRankingFromForm = (
  org: z.infer<typeof UpdateRanking>,
  form: z.infer<typeof UpdateRankingForm>
): z.infer<typeof UpdateRanking> => {
  const items = toUpdateRankingItemsFromForms(form.items)
  return deleteBaseSchema({ ...org, ...form, items })
}

export type Ranking = z.infer<typeof rankingSchema>
export type ShallowRanking = Omit<Ranking, "items">
