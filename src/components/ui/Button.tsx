"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "navy" | "ghost" | "soft";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#FD7035] text-white shadow-md shadow-[#FD7035]/25 hover:bg-[#e8632a] active:scale-[0.98]",
  secondary:
    "bg-[#C7E0E7] text-[#062B56] hover:bg-[#b5d4de] active:scale-[0.98]",
  navy: "bg-[#062B56] text-white hover:bg-[#0a3a70] active:scale-[0.98]",
  ghost: "bg-transparent text-[#062B56] hover:bg-[#C7E0E7]/50",
  soft: "bg-white text-[#062B56] border border-[#062B56]/10 shadow-sm hover:shadow-md",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-base rounded-full",
  lg: "h-14 px-8 text-lg rounded-full font-semibold",
  icon: "h-12 w-12 rounded-full flex items-center justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
