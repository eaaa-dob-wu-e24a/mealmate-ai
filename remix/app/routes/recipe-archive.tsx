import { useLoaderData } from "react-router";
import RecipeLayout from "~/components/RecipeLayout";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/profile";
type Recipe = {
  title: string;
  image: string;
  categories: string[];
};

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
    <div className="section-wrapper h-[calc(100svh-136px)] overflow-auto">
      <RecipeLayout recipes={recipes} title="Recipe Archive" />
    </div>
  );
}
