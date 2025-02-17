// You should refactor this into the diffrent routes: SignUp1, SignUp2, SignUp3

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "~/components/ui/chat-bubble";

const steps = [
  {
    title: "Welcome to mealmate!",
    content: (
      <div className="flex flex-col gap-4 items-center justify-center section-wrapper">
        <img
          src="/img/mascot-body.png"
          alt="Welcome"
          className="w-[250px] h-1/2 object-contain"
        />
        <ChatBubble variant="received" layout="default">
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
    ),
  },
  {
    title: "User Information",
    content: (
      <div className="flex flex-col gap-4 max-w-[350px] w-full mx-auto items-center justify-center section-wrapper">
        <ChatBubble variant="received" layout="ai">
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
        <div className="w-full space-y-4 mt-4">
          <Input type="email" placeholder="Email" required />
          <Input type="text" placeholder="Preferred Name" required />
          <Input type="password" placeholder="Password" required />
        </div>
      </div>
    ),
  },
  {
    title: "Select Tags",
    content: (
      <div className="flex flex-col gap-4 max-w-[350px] w-full mx-auto items-center justify-center section-wrapper">
        <ChatBubble variant="received" layout="ai">
          <ChatBubbleAvatar
            src="/img/mascot-head.png"
            fallback="M"
            className="w-8 h-8"
          />
          <ChatBubbleMessage>
            Let's personalize your experience! Select your food preferences
            below:
          </ChatBubbleMessage>
        </ChatBubble>
        <div className="w-full space-y-2 mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" value="tag1" />
            <span>Vegetarian</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" value="tag2" />
            <span>Gluten-Free</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" value="tag3" />
            <span>Spicy Food</span>
          </label>
        </div>
      </div>
    ),
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      // Simulate loading state for chat bubble
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="onboarding-container h-screen flex flex-col justify-between">
      <h1 className="text-2xl pt-10 font-bold text-center">
        {steps[currentStep].title}
      </h1>
      <div className="step-content flex-1 overflow-y-auto px-4">
        {steps[currentStep].content}
        {isLoading && (
          <ChatBubble variant="received" layout="ai">
            <ChatBubbleAvatar
              src="/img/mascot-head.png"
              fallback="M"
              className="w-8 h-8"
            />
            <ChatBubbleMessage isLoading={true} />
          </ChatBubble>
        )}
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="button-group flex gap-4 w-full justify-center">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
        <div className="pagination-dots flex gap-2 justify-center">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
