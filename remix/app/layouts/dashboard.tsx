import type { LoaderFunctionArgs } from "react-router";
import { Link, Outlet, redirect } from "react-router";
import { getSession } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  if (!session?.user.onboarded) {
    return redirect("/onboarding/3");
  }

  if (!session) {
    return redirect("/");
  }

  return null;
}

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <form action="/sign-out" method="post">
        <button type="submit">Sign out</button>
      </form>
      <Outlet />
    </div>
  );
}
