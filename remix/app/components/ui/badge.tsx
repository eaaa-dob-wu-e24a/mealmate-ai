import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex cursor-pointer w-fit items-center rounded-md border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-200 text-color-cream shadow hover:bg-primary-green/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        filter:
          "border-primary-green bg-transparent text-primary-green text-sm hover:bg-primary-green/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  // Add internal state to track toggling
  const [toggled, setToggled] = React.useState(false);

  const handleClick = () => {
    setToggled((prev) => !prev);
  };

  // If toggled, override the background to green and text to white
  const toggleStyles = toggled
    ? "bg-primary-green text-white transition-all duration-300"
    : "";

  return (
    <div
      onClick={handleClick}
      className={cn(badgeVariants({ variant }), className, toggleStyles)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
