import React, { useState, useEffect } from "react";
import type { Recipe } from "~/types";
import { getSession } from "~/lib/auth.server";
import type { Route } from "../+types/root";
import { Form, useSubmit, useNavigation } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  let apiUrl = `${process.env.API_URL}/api/recipes`;
  if (q) {
    apiUrl = `${process.env.API_URL}/api/recipes/search?q=${q}`;
  }

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const recipes = await response.json();
  return { recipes, q };
}

function RecipeSearch({ loaderData }: Route.ComponentProps) {
  const { recipes, q } = loaderData || { recipes: [], q: "" };
  const [searchTerm, setSearchTerm] = useState(q || "");
  const [searchResults, setSearchResults] = useState<Recipe[]>(recipes);
  const submit = useSubmit();
  const navigation = useNavigation();

  useEffect(() => {
    setSearchResults(recipes);
  }, [recipes]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    submit(event.currentTarget, { replace: true });
  };

  return (
    <div>
      <Form id="search-form" role="search">
        <input
          aria-label="Search recipes"
          placeholder="Search for recipes..."
          type="search"
          id="q"
          name="q"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </Form>

      {searchResults.length === 0 && searchTerm !== "" ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {searchResults.map((recipe) => (
            <li key={recipe._id}>{recipe.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeSearch;
