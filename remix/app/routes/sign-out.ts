import { redirect, type ActionFunctionArgs } from "react-router";
import { getSession, removeSession } from "~/lib/auth.server";
import { signOut } from "~/queries/auth";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  if (!session) {
    return redirect("/");
  }

  await signOut();

  return await removeSession();
}
