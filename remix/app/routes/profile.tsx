import { useLoaderData, Form } from "react-router";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/profile";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  console.log(session);
  return { user: session?.user };
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Profile
        </h1>

        <div className="space-y-6">
          {/* Profile Avatar Placeholder */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl text-gray-500">
                {user?.username?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Name
              </label>
              <p className="text-lg text-gray-800">
                {user?.username || "Not set"}
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Email
              </label>
              <p className="text-lg text-gray-800">
                {user?.email || "Not set"}
              </p>
            </div>

            {user?.tags && (
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Form action="/sign-out" method="post">
            <button
              type="submit"
              className="w-full bg-red-900 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
