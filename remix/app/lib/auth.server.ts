import { createCookieSessionStorage, redirect } from "react-router";
import type { Session } from "~/types";

// Create session storage
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "remix-session",
    httpOnly: true,
    maxAge: 15778476, // 6 months
    path: "/",
    sameSite: "lax",
    secrets: [process.env.AUTH_SECRET!], // Replace with actual secret from env
    secure: process.env.NODE_ENV === "production",
  },
});

export async function setSession(data: any) {
  const session = await sessionStorage.getSession();
  session.set("user", data);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function removeSession() {
  const session = await sessionStorage.getSession();
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getSession(request: Request): Promise<Session | null> {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");
  if (!user) return null;
  return user;
}

// No need for updateSession as Remix handles session renewal automatically
