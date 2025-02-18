import { useLoaderData } from "react-router";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type Recipe = {
  title: string;
  image: string;
  categories: string[];
  preparation: {
    total_time: string;
    prep_time: string;
    cook_time: string;
  };
  ingredients: {
    name: string;
    quantity: {
      amount: number;
      unit: string;
    };
  }[];
  servings: number;
};

export async function loader() {
  const { recipes } = await import("../data");
  return { recipes };
}

export default function RecipeArchive() {
  const { recipes } = useLoaderData<typeof loader>();
  const recipe = recipes[0];
  const [servings, setServings] = useState(recipe.servings);

  const adjustQuantity = (change: number) => {
    setServings((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[300px] rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{recipe.title}</h1>
      <div className="mt-2 flex space-x-4 text-gray-600">
        <p>Total Time: {recipe.preparation.total_time}</p>
        <p>Prep: {recipe.preparation.prep_time}</p>
        <p>Cook: {recipe.preparation.cook_time}</p>
      </div>
      <Tabs defaultValue="ingredients" className="mt-4">
        <TabsList className="w-full flex justify-between">
          <TabsTrigger value="ingredients" className="flex-1 text-center">
            Ingredients
          </TabsTrigger>
          <TabsTrigger value="instructions" className="flex-1 text-center">
            Instructions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
              <p>Servings</p>
            </div>
            <div className="mt-4 flex items-center space-x-2 bg-gray-100 rounded-xl">
              <button className="px-2" onClick={() => adjustQuantity(-1)}>
                -
              </button>
              <span>
                {servings} {servings > 1}
              </span>
              <button className="px-2" onClick={() => adjustQuantity(1)}>
                +
              </button>
            </div>
          </div>
          <ul className="mt-2 space-y-1">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{ing.name}</span>
                <span>
                  {(ing.quantity.amount * servings) / recipe.servings}{" "}
                  {ing.quantity.unit}
                </span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="instructions">
          <h2 className="text-xl font-semibold mt-4">Instructions</h2>
          <p>{recipe.instructions}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
