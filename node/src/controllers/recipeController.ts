import Recipe from "models/recipe.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

export async function listRecipes(req: Request, res: Response) {
  const auth = res.locals.auth;

  try {
    const recipes = await Recipe.find({ user: auth.user._id });
    res.status(200).json(recipes);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to list recipes" });
    }
  }
}
