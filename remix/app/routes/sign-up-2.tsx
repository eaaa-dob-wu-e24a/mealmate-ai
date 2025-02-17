// Figma Frame: Onboarding Two

import {
  Form,
  redirect,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router";
import { Button } from "~/components/ui/button";
import { ChatBubbleAvatar } from "~/components/ui/chat-bubble";
import { ChatBubble, ChatBubbleMessage } from "~/components/ui/chat-bubble";
import { Input } from "~/components/ui/input";
import { BackButton } from "~/components/ui/back-button";
import { ProgressDots } from "~/components/ui/progress-dots";
import { setSession } from "~/lib/auth.server";
import { login, signUp } from "~/queries/auth";

export default function SignUp2() {
  const navigate = useNavigate();

  return (
    <div className="section-wrapper max-w-[500px] mx-auto h-screen flex flex-col justify-between">
      <div className="mt-20">
        <h2 className="text-2xl text-center mb-10 font-bold">Sign Up</h2>
        <ChatBubble variant="received" layout="default">
          <ChatBubbleAvatar
            src="/img/mascot-head.png"
            fallback="M"
            className="w-8 h-8"
          />
          <ChatBubbleMessage>
            To get started, I'll need some basic information from you. Could you
            please fill out the following details?
          </ChatBubbleMessage>
        </ChatBubble>
      </div>
      <Form className="w-full space-y-4 mt-4" method="post">
        <Input type="text" name="username" placeholder="Username" />
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="p-4 space-y-4">
        <BackButton onBack={() => navigate("/onboarding/1")} />

        <ProgressDots totalSteps={3} currentStep={2} />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const info = await signUp(
    username as string,
    email as string,
    password as string
  );

  if (info?._id) {
    const newSession = await login(email as string, password as string);
    return await setSession(newSession);
    return redirect("/onboarding/3");
  }

  return redirect("/onboarding/2?error=" + info?.error);
}
