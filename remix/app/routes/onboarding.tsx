import React, { useState } from "react";
import { Button } from "~/components/ui/button";

const steps = [
  {
    title: "",
    content: (
      <div className="flex flex-col gap-4 h-screen items-center justify-center section-wrapper">
        <img
          src="/img/mascot-body.png"
          alt="Welcome"
          className="w-[250px] h-1/2 object-contain"
        />
        <p>Welcome to Mealmate</p>
        <p>My name is Mike, and I'm here to help you find the perfect meal.</p>
      </div>
    ),
  },
  {
    title: "User Information",
    content: (
      <>
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Preferred Name" required />
        <input type="password" placeholder="Password" required />
      </>
    ),
  },
  {
    title: "Select Tags",
    content: (
      <>
        <p>Select your interests:</p>
        <label>
          <input type="checkbox" value="tag1" /> Tag 1
        </label>
        <label>
          <input type="checkbox" value="tag2" /> Tag 2
        </label>
        <label>
          <input type="checkbox" value="tag3" /> Tag 3
        </label>
      </>
    ),
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="onboarding-container">
      <h1>{steps[currentStep].title}</h1>
      <div className="step-content">{steps[currentStep].content}</div>
      <div className="button-group flex gap-4 w-full justify-center">
        <Button
          variant="default"
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
      <div className="pagination-dots">
        {steps.map((_, index) => (
          <span
            key={index}
            className={index === currentStep ? "active" : ""}
          ></span>
        ))}
      </div>
    </div>
  );
}
