import { Message, streamText } from "ai";
import { Request, Response } from "express";
import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createRecipeValidator } from "../validators/index.js";
import { createRecipe } from "../queries/recipe.js";

function getModel(model: string) {
  if (model === "openai") {
    return openai("gpt-4o-mini");
  }

  if (model === "anthropic") {
    return anthropic("claude-3-5-haiku-latest");
  }

  if (model === "mistral") {
    return mistral("mistral-small-latest");
  }

  return openai("gpt-4o-mini");
}

export async function getChat(req: Request, res: Response) {
  const { model } = req.body;

  try {
    const { messages }: { messages: Message[] } = req.body;

    const result = streamText({
      model: getModel(model),
      system: `You are a helpful and knowledgeable culinary assistant. Your primary goals are:

1. Suggest personalized recipes based on:
   - Specific recipe requests
   - Available ingredients
   - Dietary restrictions
   - Cooking skill level

2. When suggesting recipes:
   - Start by asking about any dietary restrictions or preferences
   - Provide clear, step-by-step instructions
   - Include ingredient quantities
   - Mention cooking time and difficulty level
   - Suggest possible substitutions for common ingredients
   - Offer tips for preparation and serving

3. Recipe Storage Protocol:
   - After suggesting a recipe, ask if the user would like to save it
   - Only use the createRecipe tool after explicit user confirmation
   - When using createRecipe, split your responses into three separate messages:
     1. Announce that you're saving the recipe
     2. Execute the createRecipe tool
     3. Confirm the recipe has been saved

4. Communication Style:
   - Be friendly and encouraging
   - Adapt explanations to user's cooking expertise
   - Proactively offer relevant cooking tips
   - Ask clarifying questions when needed
   - Keep responses concise but informative`,
      messages,
      maxSteps: 10,
      tools: {
        createRecipe: {
          description: `A tool to save recipes to the user's collection. Usage guidelines:

1. Only use when the user explicitly agrees to save a recipe

2. Send messages in this exact sequence:
   - First message: Inform user you're starting to save the recipe
   - Second message: Execute the createRecipe tool
   - Third message: Confirm the recipe was saved successfully

3. Include all required recipe details:
   - Title and servings
   - Complete ingredients list with quantities
   - Step-by-step preparation instructions
   - Relevant categories and allergy information

4. Never combine these steps into a single message`,
          parameters: createRecipeValidator,
          execute: async (args) => {
            console.log("Calling createRecipe...", res.locals.auth);
            console.log(args);

            await createRecipe(args, res.locals.auth.user._id);
            return {
              title: args.title,
              image: args.image,
              servings: args.servings,
              preparation: args.preparation,
              ingredients: args.ingredients,
              allergies: args.allergies,
              categories: args.categories,
            };
          },
        },
      },
    });

    result.pipeDataStreamToResponse(res);
  } catch (error) {
    console.error("Error in getOpenAI:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}
