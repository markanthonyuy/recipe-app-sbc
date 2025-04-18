import { z } from 'zod'

export const RecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  name: z.string(),
  dateCreated: z.date(),
  image: z.string().optional(),
  isFavorite: z.boolean().optional(),
  email: z.string().email(),
  ingredients: z.string().optional(),
  instructions: z.string(),
})
