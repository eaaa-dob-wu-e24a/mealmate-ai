import type { Session } from "~/types";
import { type UserType } from "./../../../node/src/models/user";
import { getSession, setSession } from "~/lib/auth.server";

export async function getUser(request: Request): Promise<UserType | null> {
  const session = await getSession(request);

  try {
    const response = await fetch(process.env.API_URL + "/api/user", {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUser(request: Request, fields: Partial<UserType>) {
  const session = await getSession(request);

  if (!session?.token) {
    return null;
  }

  try {
    const response = await fetch(process.env.API_URL + "/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    console.log(data);
    const newSession = {
      user: { ...(data as Session["user"]) },
      token: session?.token,
    };

    return await setSession(newSession);
  } catch (error) {
    console.error(error);
    return null;
  }
}
