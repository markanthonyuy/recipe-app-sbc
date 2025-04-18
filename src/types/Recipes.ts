import { z } from 'zod'
import { RecipeSchema } from '@/schema/RecipeSchema'

export type Recipe = z.infer<typeof RecipeSchema>
