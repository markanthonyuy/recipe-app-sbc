import { z } from 'zod'

export const RecipeSchema = z.object({
  id: z.string(),
  title: z.string().nonempty(),
  description: z.string().optional(),
  name: z.string().nonempty(),
  dateCreated: z.date(),
  dateModified: z.date(),
  image: z.string().optional(),
  isFavorite: z.boolean().optional(),
  email: z.string().email(),
  ingredients: z.string().optional(),
  instructions: z.string().nonempty(),
})
