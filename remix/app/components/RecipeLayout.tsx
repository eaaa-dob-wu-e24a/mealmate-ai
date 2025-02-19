import React, { useState } from "react";
import { Link } from "react-router";
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

  // Get unique categories from all recipes
  const uniqueCategories = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.categories))
  ).sort();

  // Filter recipes based on selected category
  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.categories.includes(selectedCategory))
    : recipes;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      {/* Scrollable categories filter */}
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

      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4 ">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <Link
              to={`/recipe/${recipe._id}`}
              key={index}
              className="rounded-lg overflow-hidden shadow-md relative h-32 flex flex-col-reverse justify-between"
              style={{
                backgroundImage: `url(${recipe.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-semibold text-sm pl-2 text-white mb-2">
                {recipe.title}
              </h3>
              <div className="flex gap-2 justify-end pr-2 pt-2 flex-wrap">
                {recipe.categories.slice(0, 2).map((category, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </Link>
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
