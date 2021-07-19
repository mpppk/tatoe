import * as z from "zod"
import { baseSchema, baseSchemaKeyObject, deleteBaseSchema } from "../core/baseModel"
import {
  CreateRankingItem,
  CreateRankingItemForm,
  rankingItemSchema,
  toUpdateRankingItemsFromForms,
  UpdateRankingItem,
  UpdateRankingItemForm,
} from "../ranking-items/validations"

export const userBaseSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  pictureUrl: z.string().nonempty().nullable(),
})

export const rankingSchema = z
  .object({
    id: z.number().positive(),
    title: z.string().nonempty().max(50),
    description: z.string().nonempty().max(100),
    source: z.string().nullable(),
    owner: userBaseSchema,
    items: rankingItemSchema.array().min(1),
    canBeEditedByAnotherUser: z.boolean(),
  })
  .merge(baseSchema)

export const CreateRanking = rankingSchema
  .omit({
    id: true,
    owner: true,
    ...baseSchemaKeyObject,
  })
  .extend({
    ownerId: z.string(),
    items: CreateRankingItem.array().min(1),
  })
export type CreateRankingModel = z.infer<typeof CreateRanking>

export const CreateRankingForm = CreateRanking.extend({
  items: CreateRankingItemForm.array().min(1),
})
export type CreateRankingFormModel = z.infer<typeof CreateRankingForm>

export const UpdateRanking = rankingSchema
  .extend({ items: UpdateRankingItem.array() })
  .omit(baseSchemaKeyObject)

export const UpdateRankingForm = rankingSchema.partial().extend({
  title: rankingSchema.shape.title,
  description: rankingSchema.shape.description,
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
