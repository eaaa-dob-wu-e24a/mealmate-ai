import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";
import { createRecipeValidator } from "../validators/index.js";
import { v2 as cloudinary } from "cloudinary";
import Recipe from "../models/recipe.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createRecipe = async (recipe: any, user_id: string) => {
  const parsed = createRecipeValidator.safeParse(recipe);

  if (!parsed.success) {
    throw new Error("Invalid recipe");
  }

  const { images } = await generateImage({
    model: openai.image("dall-e-2"),
    prompt: parsed.data.image_description_for_dalle,
    n: 1,
    size: "1024x1024",
  });

  // Upload the base64 image to Cloudinary
  const uploadResponse = await cloudinary.uploader.upload(
    `data:image/png;base64,${images[0].base64}`,
    {
      folder: "recipes", // Optional: organize images in folders
    }
  );

  const image = uploadResponse.secure_url;

  const createdRecipe = await Recipe.create({
    ...parsed.data,
    image,
    user: user_id,
  });

  return createdRecipe;
};
