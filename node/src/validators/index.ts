import { z } from "zod";

export const createRecipeValidator = z.object({
  title: z.string(),
  image_description_for_dalle: z
    .string()
    .describe("A description of the image you want to generate for the recipe"),
  servings: z.number(),
  preparation: z.object({
    total_time: z.string(),
    prep_time: z.string(),
    cook_time: z.string(),
  }),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
    })
  ),
  instructions: z.array(z.string()),
  allergies: z.array(z.string()),
  categories: z.array(z.string()),
});
