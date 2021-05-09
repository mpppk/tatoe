import * as z from "zod"
import { baseSchema, baseSchemaKeyObject, deleteBaseSchema } from "../core/baseModel"

const baseRankingItemSchema = z.object({
  id: z.number(),
  rankingId: z.number(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  rank: z.number(),
})

export const rankingItemSchema = baseRankingItemSchema
  .extend({
    subtitle: baseRankingItemSchema.shape.subtitle.nullable(),
    description: baseRankingItemSchema.shape.description.nullable(),
  })
  .merge(baseSchema)

export const CreateRankingItem = rankingItemSchema
  .omit({
    id: true,
    rankingId: true,
    ...baseSchemaKeyObject,
  })
  .partial()
  .extend({
    title: rankingItemSchema.shape.title,
    rank: rankingItemSchema.shape.rank,
  })
export type CreateRankingItemModel = z.infer<typeof CreateRankingItem>

export const CreateRankingItemForm = CreateRankingItem.omit({ rank: true })
export type CreateRankingItemFormModel = z.infer<typeof CreateRankingItemForm>

export const UpdateRankingItem = rankingItemSchema
  // Ranking更新時は、RankingItemは追加する場合と更新する場合がある
  .extend({ id: rankingItemSchema.shape.id.optional() })
  .omit({
    rankingId: true,
    ...baseSchemaKeyObject,
  })
type UpdateRankingItemModel = z.infer<typeof UpdateRankingItem>

export const UpdateRankingItemForm = rankingItemSchema.partial().extend({
  title: rankingItemSchema.shape.title,
})
type UpdateRankingItemFormModel = z.infer<typeof UpdateRankingItemForm>

export const toUpdateRankingItemsFromForms = (
  forms: UpdateRankingItemFormModel[]
): UpdateRankingItemModel[] => {
  return forms.map((form, index) => toUpdateRankingItemFromForm(index + 1, form))
}

const toUpdateRankingItemFromForm = (
  rank: number,
  form: UpdateRankingItemFormModel
): UpdateRankingItemModel => {
  const ret = {
    ...form,
    rank,
    subtitle: form.subtitle ?? null,
    description: form.description ?? null,
  }
  delete ret.rankingId
  return deleteBaseSchema(ret)
}

export const reRankItems = (items: CreateRankingItemFormModel[]): CreateRankingItemModel[] => {
  return items.map((i, index) => ({ ...i, rank: index + 1 }))
}

export type RankingItem = z.infer<typeof rankingItemSchema>
