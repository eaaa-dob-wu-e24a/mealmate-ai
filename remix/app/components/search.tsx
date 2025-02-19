import React, { useState, useEffect, type ChangeEvent } from "react";
import type { Recipe } from "~/types";
import type { Route } from "../+types/root";
import { Form, useSubmit, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  let apiUrl = `${process.env.API_URL}/api/recipes`;
  if (q) {
    apiUrl = `${process.env.API_URL}/api/recipes/search?q=${q}`;
  }

  const response = await fetch(apiUrl);
  const recipes = await response.json();

  return { recipes, q };
}

function RecipeSearch({ recipes, q }: { recipes: Recipe[]; q: string }) {
  const [searchTerm, setSearchTerm] = useState<string>(q);
  const [searchResults, setSearchResults] = useState<Recipe[]>(recipes);
  const submit = useSubmit();
  const navigation = useNavigation();

  useEffect(() => {
    setSearchResults(recipes);
  }, [recipes]);

  useEffect(() => {
    setSearchTerm(q);
  }, [q]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== q) {
        const form = document.getElementById("search-form") as HTMLFormElement;
        submit(form, { replace: true });
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, q, submit]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Form id="search-form" role="search">
        <Input
          aria-label="Search recipes"
          defaultValue={q}
          placeholder="Search for recipes..."
          type="search"
          id="q"
          name="q"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </Form>
      <ul>
        {searchResults.map((recipe) => (
          <li key={recipe._id}></li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeSearch;
