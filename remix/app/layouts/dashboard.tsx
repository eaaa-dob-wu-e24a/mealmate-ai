import type { LoaderFunctionArgs } from "react-router";
import { Outlet, redirect } from "react-router";
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
    <>
      <Outlet />
    </>
  );
}
