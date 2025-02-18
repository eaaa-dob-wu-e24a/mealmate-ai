import { Message, streamText } from "ai";
import { Request, Response } from "express";
import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createRecipeValidator } from "validators/index.js";
import { createRecipe } from "queries/recipe.js";

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
      messages,
      maxSteps: 10,
      tools: {
        suggestRecipe: {
          description:
            "Use this tool to suggest a recipe to the user whenever the user asks to create a recipe or when the user asks for a recipe suggestion. The user will either provide a recipe name, or a list of ingredients. If the user provides a recipe name, you will suggest a recipe that matches the name. If the user provides a list of ingredients, you will suggest a recipe that can be made with those ingredients. You'll always end your message with suggesting if you should use the createRecipe tool to add the recipe to the users profile.",
          parameters: z.object({
            ingredients: z.array(z.string()),
          }),
          execute: async (args) => {
            console.log("Calling suggestRecipe...", res.locals.auth);
            console.log(args);
            return args;
          },
        },
        createRecipe: {
          description:
            "ONLY use this tool when the user has accepted the recipe suggestion from the suggestRecipe tool, also create a very detailed description of an fitting image of the recipe, that the DALLE model can use to generate an image. Before you use this tool, please send a message about that you're using the createRecipe tool to the user before you use the tool, and then use the tool, and then send a message about that you're done using the createRecipe tool to the user.",
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
