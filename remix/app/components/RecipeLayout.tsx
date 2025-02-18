import React from "react";
import { Link } from "react-router";

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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
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
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
}
