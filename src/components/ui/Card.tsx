import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "blue" | "accent";
  padding?: "sm" | "md" | "lg";
}

const variants = {
  white: "bg-white",
  blue: "bg-[#C7E0E7]",
  accent: "bg-[#FD7035]/15",
};

const paddings = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  className,
  variant = "white",
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] shadow-[0_8px_30px_rgba(6,43,86,0.06)]",
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
