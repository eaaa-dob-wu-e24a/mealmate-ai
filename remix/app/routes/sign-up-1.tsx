import { useNavigate, Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "~/components/ui/chat-bubble";
import { ProgressDots } from "~/components/ui/progress-dots";

export default function SignUp1() {
  const navigate = useNavigate();

  const previousStep = () => {
    navigate("/");
  };

  const nextStep = () => {
    navigate("/onboarding/2");
  };

  return (
    <div className="onboarding-container section-wrapper min-h-[calc(100svh-66px)] flex flex-col justify-between">
      <h1 className="text-2xl pt-10 font-bold text-center">
        Welcome to mealmate!
      </h1>

      <div className="flex-1 flex flex-col gap-4 items-center justify-center px-4">
        <img
          src="/img/mascot-body.png"
          alt="Welcome"
          className="w-[250px] h-1/2 object-contain"
        />

        <div className="flex flex-col gap-4 w-full mx-auto items-center justify-center">
          <ChatBubble variant="received" layout="intro">
            <ChatBubbleAvatar
              src="/img/mascot-head.png"
              fallback="M"
              className="w-12 h-12"
            />
            <ChatBubbleMessage>
              Hi there! 👋 We're excited to have you on board!
            </ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="received" layout="default">
            <ChatBubbleAvatar
              src="/img/mascot-head.png"
              fallback="M"
              className="w-12 h-12"
            />
            <ChatBubbleMessage>
              My name is Mike, and I'm here to help you find the perfect meal.
            </ChatBubbleMessage>
          </ChatBubble>
        </div>
      </div>

      <div className="p-4 space-y-4 flex flex-col items-center">
        <Link to="/onboarding/2">
          <Button className="min-w-[200px] " variant="default">
            Next
          </Button>
        </Link>

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        <ProgressDots totalSteps={3} currentStep={1} />
      </div>
    </div>
  );
}
