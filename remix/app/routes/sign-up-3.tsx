// Figma Frame: Onboarding Five

import { Form, type ActionFunctionArgs } from "react-router";
import { Badge } from "~/components/ui/badge";
import { updateUser } from "~/queries/user";
import { ChatBubble, ChatBubbleMessage } from "~/components/ui/chat-bubble";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const interests = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Mediterranean",
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Desserts",
  "Quick & Easy",
  "Fine Dining",
];

export default function SignUp3() {
  return (
    <div className="flex flex-col items-center justify-between h-screen section-wrapper">
      <div className="flex flex-col items-center gap-4 justify-center">
        <div className="flex items-center gap-4 justify-center">
          <img
            src="/img/mascot-body.png"
            alt="Welcome"
            className="w-[250px] h-1/2 object-contain"
          />
          <ChatBubble variant="received" layout="intro">
            <ChatBubbleMessage>
              Select your favourite cusisines
            </ChatBubbleMessage>
          </ChatBubble>
        </div>
        <div className="flex flex-wrap gap-2 max-w-[300px]">
          {interests.map((interest) => (
            <Badge key={interest}>{interest}</Badge>
          ))}
        </div>
      </div>
      <Form className="mb-10 w-full flex justify-center" method="post">
        <Button
          className={cn(
            buttonVariants({ variant: "default" }),
            "mx-auto max-w-[300px] w-full"
          )}
          type="submit"
        >
          Submit
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
  return await updateUser(request, { onboarded: true });
}
