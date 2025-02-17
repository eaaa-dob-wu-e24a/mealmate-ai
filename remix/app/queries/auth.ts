export async function signUp(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await fetch(process.env.API_URL + "/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to sign up");
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch(process.env.API_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to login");
  }
}

export async function signOut() {
  try {
    const response = await fetch(process.env.API_URL + "/api/auth/sign-out");

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to sign out");
  }
}
