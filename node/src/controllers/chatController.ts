import { Message, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Request, Response } from "express";
import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";

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
    });

    result.pipeDataStreamToResponse(res);
  } catch (error) {
    console.error("Error in getOpenAI:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}
