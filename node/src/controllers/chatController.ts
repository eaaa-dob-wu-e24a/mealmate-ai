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
  const tags = res.locals.auth?.user?.tags; // e.g., ["rice", "fish"]

  try {
    const { messages }: { messages: Message[] } = req.body;

    const result = streamText({
      model: getModel(model),
      system: `You are a helpful and knowledgeable culinary assistant. Your primary goals are:

1. Tag-Based Recipe Suggestions:
   - You have access to the user's cuisine and dietary preferences: ${tags?.join(
     ", "
   )}.
   - Use these tags as inspiration when:
     a) The user specifically asks for personalized suggestions
     b) The user asks for inspiration
     c) The conversation starts without specific context or requirements
   - Feel free to suggest recipes outside these preferences when the user makes specific requests.
   - If the tags include dietary restrictions (e.g., Vegetarian, Vegan, Gluten-Free), always respect these restrictions unless explicitly overridden by the user.

2. Recipe Details:
   - For each recipe suggestion, include a brief description of the dish, the description should be in a unordered list.
   - If a user selects a suggestion or asks for more details, provide a complete recipe including ingredients (with precise measurements), cooking steps, estimated time, and helpful preparation tips.

3. Recipe Storage Protocol - CRITICAL SEQUENCE:
   - ONLY save a recipe when the user explicitly requests to do so.
   - Follow these exact steps in sequence:
     Step 1: Ask "Would you like me to save this recipe to your collection?"
     Step 2: WAIT for user confirmation.
     Step 3: Upon confirmation, first send "I'll save this recipe to your collection now."
     Step 4: Make ONE single call to the createRecipe tool.
     Step 5: After createRecipe completes, send "The recipe has been successfully saved to your collection!"
   - Do not call createRecipe multiple times for the same recipe or deviate from these steps.

4. When Using createRecipe Tool (SINGLE USE ONLY):
   - Include relevant user tags in the recipe categories when appropriate.
   - Ensure all required recipe information is present before calling the tool.
   - Provide a full ingredients list with precise measurements and clear preparation steps.
   - Add relevant categories based on both the recipe content and applicable user tags.
   - Specify any common allergens.
   - Make exactly one call to createRecipe per recipe.

5. Communication Style:
   - Be direct and helpful while maintaining flexibility in recipe suggestions.
   - When no specific request is made, use the tags as a starting point: ${tags?.join(
     ", "
   )}.
   - Keep responses concise, friendly, and informative.
   - Focus on being helpful rather than strictly adhering to saved preferences.`,
      messages,
      maxSteps: 10,
      tools: {
        createRecipe: {
          description: `A tool to save recipes to the user's collection. Usage guidelines:

1. Only use when the user explicitly agrees to save a recipe.

2. Send messages in this exact sequence:
   - First message: Inform the user you're starting to save the recipe.
   - Second message: Execute the createRecipe tool.
   - Third message: Confirm the recipe was saved successfully.

3. Include all required recipe details:
   - Title and servings.
   - Complete ingredients list with quantities.
   - Step-by-step preparation instructions.
   - Relevant categories and allergy information.

4. Never combine these steps into a single message.`,
          parameters: createRecipeValidator,
          execute: async (args) => {
            console.log(args);
            const recipe = await createRecipe(args, res.locals.auth.user._id);
            return {
              title: args.title,
              image: recipe.image,
              categories: args.categories,
              recipe_id: recipe._id,
            };
          },
        },
      },
    });

    result.pipeDataStreamToResponse(res);
  } catch (error) {
    console.error("Error in getChat:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}
