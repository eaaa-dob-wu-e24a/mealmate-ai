import express from "express";
import { listRecipes } from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", listRecipes);

export default router;
