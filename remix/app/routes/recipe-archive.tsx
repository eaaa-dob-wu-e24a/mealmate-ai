import { useLoaderData } from "react-router";
import RecipeLayout from "~/components/RecipeLayout";

type Recipe = {
  title: string;
  image: string;
  categories: string[];
};

export async function loader() {
  const { recipes } = await import("~/data");
  return recipes.map(({ title, image, categories }) => ({
    title,
    image,
    categories,
  }));
}

export default function RecipeArchive() {
  const recipes = useLoaderData<typeof loader>() || [];

  return (
    <div className="section-wrapper">
      <RecipeLayout recipes={recipes} title="Recipe Archive" />
    </div>
  );
}
