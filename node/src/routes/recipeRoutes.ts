import express from "express";
import {
  listRecipes,
  getRecipe,
  searchForRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", listRecipes);
router.get("/search", searchForRecipe);
router.get("/:id", getRecipe);

export default router;
