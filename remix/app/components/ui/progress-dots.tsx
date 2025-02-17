import React from "react";

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export function ProgressDots({
  totalSteps,
  currentStep,
  className = "",
}: ProgressDotsProps) {
  return (
    <div className={`pagination-dots flex gap-2 justify-center ${className}`}>
      {[...Array(totalSteps)].map((_, index) => (
        <span
          key={index}
          className={`w-2 h-2 rounded-full transition-colors ${
            index === currentStep - 1 ? "bg-primary" : "bg-gray-300"
          }`}
        ></span>
      ))}
    </div>
  );
}
