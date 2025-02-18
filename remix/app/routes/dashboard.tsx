import { useLoaderData } from "react-router";
import RecipeLayout from "~/components/RecipeLayout"; // Import the shared layout
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/dashboard";

type Recipe = {
  title: string;
  image: string;
  categories: string[];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const user = session?.user;
  const resposne = await fetch(`${process.env.API_URL}/api/recipes`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
      "Content-Type": "application/json",
    },
  });
  const recipes = await resposne.json();

  return { user, recipes };
}

export default function Dashboard() {
  const { user, recipes } = useLoaderData<typeof loader>();
  return (
    <div className="section-container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Welcome {user?.username}</h2>
      <RecipeLayout recipes={recipes} />
    </div>
  );
}
