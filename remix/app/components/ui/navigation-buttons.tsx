// components/NavigationButtons.tsx
import { Button } from "~/components/ui/button";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function NavigationButtons({
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
  className = "",
}: NavigationButtonsProps) {
  return (
    <div
      className={`button-group flex gap-4 w-full justify-center ${className}`}
    >
      <Button
        variant="default"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        Back
      </Button>
      <Button variant="default" onClick={onNext}>
        {currentStep === totalSteps ? "Get Started" : "Next"}
      </Button>
    </div>
  );
}
