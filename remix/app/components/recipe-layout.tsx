import React from "react";
import { Link } from "react-router";
import Recipe from "./recipe";
import RecipeSearch from "./search";

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
      <div className="pb-4">
        <RecipeSearch recipes={recipes} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
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
