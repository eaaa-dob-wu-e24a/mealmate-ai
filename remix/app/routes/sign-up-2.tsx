// Figma Frame: Onboarding Two

import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { setSession } from "~/lib/auth.server";
import { login, signUp } from "~/queries/auth";

export default function SignUp2() {
  return (
    <Form method="post">
      <input type="text" name="username" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const info = await signUp(
    username as string,
    email as string,
    password as string
  );

  if (info?._id) {
    const newSession = await login(email as string, password as string);
    return await setSession(newSession);
  }

  return redirect("/onboarding/2?error=" + info?.error);
}
