import express from "express";
import { listRecipes, getRecipe } from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", listRecipes);
router.get("/:id", getRecipe);

export default router;
