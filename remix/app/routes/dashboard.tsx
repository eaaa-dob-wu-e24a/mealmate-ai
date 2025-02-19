import { Link, useLoaderData } from "react-router";
import RecipeLayout from "~/components/recipe-layout"; // Import the shared layout
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/dashboard";
import { ChatBubble, ChatBubbleMessage } from "~/components/ui/chat-bubble";
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
    <div className="mx-auto min-h-[calc(100svh-136px)] overflow-auto">
      <div className="flex flex-col items-center rounded-b-[18px] top-0 left-0 w-full shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
        <img
          src="/img/mealmatelogo-font.png"
          alt="Meal Mate Logo"
          className="w-40 h-fit mx-auto py-4 object-contain"
        />
      </div>
      <div className="section-wrapper">
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
