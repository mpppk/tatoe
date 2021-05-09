import * as z from "zod"
import { baseSchema, baseSchemaKeyObject, deleteBaseSchema } from "../core/baseModel"
import UpdateRanking from "../rankings/mutations/updateRanking"

export const rankingItemSchema = z
  .object({
    id: z.number(),
    rankingId: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    rank: z.number(),
  })
  .merge(baseSchema)

export const CreateRankingItem = rankingItemSchema.omit({
  id: true,
  rankingId: true,
  ...baseSchemaKeyObject,
})

export const UpdateRankingItem = rankingItemSchema
  // Ranking更新時は、RankingItemは追加する場合と更新する場合がある
  .extend({ id: rankingItemSchema.shape.id.optional() })
  .omit({
    rankingId: true,
    ...baseSchemaKeyObject,
  })
type UpdateRankingItemModel = z.infer<typeof UpdateRankingItem>

export const UpdateRankingItemForm = rankingItemSchema.partial().extend({
  name: rankingItemSchema.shape.name,
  description: rankingItemSchema.shape.description,
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
  const ret = { ...form, rank }
  delete ret.rankingId
  return deleteBaseSchema(ret)
}

export const reRankItems = (items: z.infer<typeof CreateRankingItem>[]) => {
  return items.map((i, index) => ({ ...i, rank: index + 1 }))
}

export type RankingItem = z.infer<typeof rankingItemSchema>
