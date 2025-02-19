// Figma Frame: Onboarding Two

import {
  Form,
  redirect,
  useNavigate,
  useSearchParams,
  type ActionFunctionArgs,
} from "react-router";
import { BackButton } from "~/components/ui/back-button";
import { Button } from "~/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "~/components/ui/chat-bubble";
import { Input } from "~/components/ui/input";
import { ProgressDots } from "~/components/ui/progress-dots";
import { setSession } from "~/lib/auth.server";
import { login, signUp } from "~/queries/auth";

export default function SignUp2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="section-wrapper max-w-[500px] mx-auto min-h-[calc(100svh-66px)] flex flex-col justify-between">
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
        {error && <p className="text-red-500">{error}</p>}
        <Input
          type="text"
          name="username"
          placeholder="Username"
          className={`${
            error?.includes("username")
              ? "border-red-500 focus:border-red-500"
              : ""
          }`}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className={`${
            error?.includes("email")
              ? "border-red-500 focus:border-red-500"
              : ""
          }`}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className={`${
            error?.includes("password")
              ? "border-red-500 focus:border-red-500"
              : ""
          }`}
        />
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
