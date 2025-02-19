import React, { useState } from "react";
import { Link } from "react-router";
import Recipe from "./recipe";
import RecipeSearch from "./search";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const uniqueCategories = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.categories))
  ).sort();

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.categories.includes(selectedCategory))
    : recipes;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="pb-4">
        <RecipeSearch recipes={recipes} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (

      <div className="relative mb-6 w-full">
        <div className="flex overflow-x-auto scrollbar-hide pb-2 -mb-2 gap-2">
          <div className="flex gap-2 snap-x snap-mandatory">
            {uniqueCategories.map((category) => (
              <Badge
                key={category}
                variant="filter"
                onClick={() =>
                  setSelectedCategory(
                    category === selectedCategory ? null : category
                  )
                }
                className={`cursor-pointer shrink-0 snap-start ${
                  category === selectedCategory
                    ? "bg-primary-green text-white border-primary-green"
                    : ""
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <Recipe
              key={index}
              id={recipe._id}
              image={recipe.image}
              title={recipe.title}
              categories={recipe.categories}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p>No recipes available.</p>
            <Link to="/chatbot">
              <Button className="mt-4" variant="outline">
                Ask Meal Mate
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
