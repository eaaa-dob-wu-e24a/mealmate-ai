// Figma Frame: Onboarding Five

import { Form, useNavigate, type ActionFunctionArgs } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ChatBubble, ChatBubbleMessage } from "~/components/ui/chat-bubble";
import { updateUser } from "~/queries/user";
import { useState } from "react";
import availableTags from "~/layouts/tags";

export default function SignUp3() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100svh-66px)] section-wrapper">
      <div className="flex flex-col items-center gap-4 justify-center">
        <div className="flex items-center gap-4 justify-center">
          <img
            src="/img/mascot-body.png"
            alt="Welcome"
            className="w-[250px] h-1/2 object-contain"
          />
          <ChatBubble variant="received" layout="intro">
            <ChatBubbleMessage>Select your favorite cuisines</ChatBubbleMessage>
          </ChatBubble>
        </div>
        <div className="flex flex-wrap gap-2 max-w-[300px] justify-center">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={
                selectedTags.includes(tag) ? "bg-primary-green text-white" : ""
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <Form
        className="mb-10 w-full flex justify-center"
        method="post"
        onSubmit={(e) => {
          if (selectedTags.length === 0) {
            e.preventDefault();
            alert("Please select at least one tag");
          }
        }}
      >
        <input type="hidden" name="tags" value={JSON.stringify(selectedTags)} />
        <Button className="mx-auto max-w-[300px] w-full" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
}

// export async function loader({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const interests = formData.getAll("interests");
// }

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const tags = JSON.parse(formData.get("tags") as string);

  return await updateUser(request, {
    tags,
    onboarded: true,
  });
}
