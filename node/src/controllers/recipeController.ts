import Recipe from "../models/recipe.js";
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

export async function getRecipe(req: Request, res: Response) {
  const auth = res.locals.auth;
  const { id } = req.params;

  try {
    const recipe = await Recipe.findOne({
      _id: id,
      user: auth.user._id,
    });
    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.status(200).json(recipe);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to get recipe" });
    }
  }
}
