import { Link, useLoaderData } from "react-router";
import RecipeLayout from "~/components/recipe-layout";
import { Button } from "~/components/ui/button";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/profile";
import RecipeSearch from "~/components/search";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const user = session?.user;
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
  const recipes = await response.json();

  return { user, recipes, q };
}

export default function RecipeArchive() {
  const { recipes, q } = useLoaderData<typeof loader>();

  return (
    <div className="section-wrapper mt-10 h-[calc(100svh-136px)] overflow-auto">
      <div>
        <RecipeLayout recipes={recipes} title="Recipe Archive" />
      </div>
      <div className="flex justify-center mt-10">
        <Link to="/chatbot">
          <Button variant="outline">Chat with Mike for more recipes</Button>
        </Link>
      </div>
    </div>
  );
}
