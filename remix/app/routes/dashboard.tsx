import { Form, useLoaderData } from "react-router";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const response = await fetch(`${process.env.API_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const users = await response.json();
  return Response.json({ users });
}

export default function Dashboard() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Ali moussas klub</h1>
      <Form method="post" className="flex gap-2">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="Email"
          type="text"
          name="email"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="Name"
          type="text"
          name="name"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Submit
        </button>
      </Form>

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
