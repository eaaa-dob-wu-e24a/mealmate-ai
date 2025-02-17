import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { json } from "stream/consumers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const response = await fetch(`${process.env.API_URL}/api/users`);
  const users = await response.json();
  return Response.json({ users });
}

export default function Home() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Home</h1>
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

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name");
  console.log(email, name);

  const response = await fetch(`${process.env.API_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify({ email, name }),
  });
  const user = await response.json();
  console.log(user);
}
