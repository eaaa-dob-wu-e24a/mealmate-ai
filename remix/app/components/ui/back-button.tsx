// components/BackButton.tsx

interface BackButtonProps {
  onBack: () => void;
  className?: string;
}

export function BackButton({ onBack, className = "" }: BackButtonProps) {
  return (
    <button
      className="text-sm absolute bottom-0 left-5 text-gray-500 underline"
      onClick={onBack}
    >
      Back
    </button>
  );
}
