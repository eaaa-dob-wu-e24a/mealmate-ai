import { useLoaderData } from "react-router";

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
  const recipes = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-6">Recipe Archive</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {recipes.map((recipe, index) => (
          <div
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
            <div className="flex  gap-2 justify-end pr-2 pt-2">
              {recipe.categories.slice(0, 2).map((category, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
