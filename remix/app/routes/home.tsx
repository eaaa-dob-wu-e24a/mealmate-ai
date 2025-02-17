import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { User } from "~/models/user.model";
import { json } from "stream/consumers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const users = await User.find();
  return Response.json({ users });
}

export default function Home() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Home</h1>
      <Form method="post">
        <input type="text" name="email" />
        <input type="text" name="name" />
        <button type="submit">Submit</button>
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

  const user = await User.create({ email, name });
  console.log(user);
}
