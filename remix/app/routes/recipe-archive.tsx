import { Link, useLoaderData } from "react-router";
import RecipeLayout from "~/components/recipe-layout";
import { Button } from "~/components/ui/button";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/profile";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);

  const resposne = await fetch(`${process.env.API_URL}/api/recipes`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
      "Content-Type": "application/json",
    },
  });
  const recipes = await resposne.json();
  return { recipes };
}
export default function RecipeArchive() {
  const { recipes } = useLoaderData<typeof loader>();

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
