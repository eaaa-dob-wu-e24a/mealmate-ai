import mongoose, { InferSchemaType, model } from "mongoose";

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  preparation: {
    total_time: { type: String, required: true },
    prep_time: { type: String, required: true },
    cook_time: { type: String, required: true },
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: {
        amount: { type: Number, required: true },
        unit: { type: String },
      },
    },
  ],
  instructions: { type: [String], required: true },
  allergies: [
    {
      type: String,
    },
  ],
  categories: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type RecipeType = InferSchemaType<typeof recipeSchema>;
const Recipe = model<RecipeType>("Recipe", recipeSchema);

export default Recipe;
