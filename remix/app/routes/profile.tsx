import {
  useLoaderData,
  Form,
  type ActionFunctionArgs,
  useActionData,
  useFetcher,
} from "react-router";
import { getSession } from "~/lib/auth.server";
import type { Route } from "./+types/profile";
import { updateUser } from "~/queries/user";
import { Button } from "~/components/ui/button";
import { FiEdit2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import availableTags from "~/layouts/tags";
import { Badge } from "~/components/ui/badge";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  console.log(session);
  return { user: session?.user };
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(user?.tags || []);

  // Reset editing mode when update is successful
  useEffect(() => {
    if (fetcher.data?.success) {
      setIsEditing(false);
    }
  }, [fetcher.data]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-[calc(100svh-136px)] overflow-auto bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiEdit2
              className={isEditing ? "text-primary-green" : "text-gray-400"}
            />
          </button>
        </div>

        {fetcher.data?.error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {fetcher.data.error}
          </div>
        )}

        {fetcher.data?.success && (
          <div className="mb-4 p-3 text-sm text-green-500 bg-green-50 rounded-md">
            Profile updated successfully!
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Avatar Placeholder */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl text-gray-500">
                {user?.username?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>

          <fetcher.Form method="post" className="space-y-6">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Username
                </label>
                {isEditing ? (
                  <input
                    name="username"
                    defaultValue={user?.username || ""}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg text-gray-800">
                    {(fetcher.formData?.get("username") as string) ||
                      user?.username}
                  </p>
                )}
              </div>

              <div className="border-b pb-4">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg text-gray-800">
                    {(fetcher.formData?.get("email") as string) || user?.email}
                  </p>
                )}
              </div>

              {user?.tags && (
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Interests
                  </label>
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={
                            selectedTags.includes(tag)
                              ? "bg-primary-green text-white"
                              : ""
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
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
                  )}
                </div>
              )}

              <input
                type="hidden"
                name="tags"
                value={JSON.stringify(selectedTags)}
              />
            </div>

            {isEditing && (
              <Button
                type="submit"
                className="w-full"
                disabled={fetcher.state !== "idle"}
              >
                {fetcher.state !== "idle" ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </fetcher.Form>
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates: Record<string, any> = {};

  // Only add fields that were submitted
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const tags = formData.get("tags")
    ? JSON.parse(formData.get("tags") as string)
    : null;

  // Only include fields that have values
  if (username) updates.username = username;
  if (email) updates.email = email;
  if (tags) updates.tags = tags;

  // Use updateUser directly like in sign-up-3.tsx
  return await updateUser(request, updates);
}
