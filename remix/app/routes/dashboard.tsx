import { Link, useLoaderData } from "react-router";
import RecipeLayout from "~/components/RecipeLayout";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/dashboard";
import { ChatBubble, ChatBubbleMessage } from "~/components/ui/chat-bubble";
import RecipeSearch from "~/components/search";
import type { Recipe } from "~/types"; // Import the Recipe type

type DashboardLoaderData = {
  user: any;
  recipes: Recipe[];
  q: string;
};

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

export default function Dashboard() {
  const { user, recipes, q } = useLoaderData<
    typeof loader
  >() as DashboardLoaderData;

  return (
    <div className="mx-auto min-h-[calc(100svh-136px)] overflow-auto">
      <div className="flex flex-col items-center rounded-b-[18px] top-0 left-0 w-full shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
        <img
          src="/img/mealmatelogo-font.png"
          alt="Meal Mate Logo"
          className="w-40 h-fit mx-auto py-4 object-contain"
        />
      </div>
      <div className="section-wrapper">
        <div className="pt-4">
          <RecipeSearch recipes={recipes} q={q} />
        </div>
        <div className="flex items-center justify-between">
          <img
            src="/img/mascot-head.png"
            alt="Meal Mate Logo"
            className="w-40 h-40 object-contain"
          />
          <Link to="/chatbot">
            <ChatBubble variant="received" layout="intro">
              <ChatBubbleMessage>
                <p>Hey {user?.username}! It is nice to see you back.</p>
              </ChatBubbleMessage>
            </ChatBubble>
          </Link>
        </div>
        <div>
          <p>Choose category</p>
        </div>

        <RecipeLayout recipes={recipes} />
      </div>
    </div>
  );
}
