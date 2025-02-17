import { Outlet, redirect, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getSession } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  if (!session) {
    return redirect("/");
  }

  if (session?.user.onboarded) {
    console.log("redirecting to dashboard");
    return redirect("/dashboard");
  }

  return null;
}

export default function OnboardingLayout() {
  return <Outlet />;
}
