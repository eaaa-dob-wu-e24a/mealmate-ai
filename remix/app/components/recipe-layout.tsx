import React from "react";
import { Link } from "react-router";
import Recipe from "./recipe";

type Recipe = {
  _id: string;
  title: string;
  image: string;
  categories: string[];
};

type RecipeLayoutProps = {
  recipes: Recipe[];
  title?: string;
};

export default function RecipeLayout({
  recipes,
  title = "Recipes",
}: RecipeLayoutProps) {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4 ">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <Recipe
              key={index}
              id={recipe._id}
              image={recipe.image}
              title={recipe.title}
              categories={recipe.categories}
            />
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
}
