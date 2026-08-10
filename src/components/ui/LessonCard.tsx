"use client";

import Link from "next/link";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  vocabulary: "Բառապաշար",
  grammar: "Քերականություն",
  conversation: "Խոսակցություն",
  "weekly-test": "Շաբաթվա թեստ",
  listening: "Լսել",
  dictation: "Թելադրություն",
  speaking: "Խոսել",
};

export function LessonCard({
  href,
  title,
  subtitle,
  type,
  status,
  variant = "blue",
  dayLabel,
}: {
  href: string;
  title: string;
  subtitle?: string;
  type: string;
  status: "completed" | "today" | "upcoming";
  variant?: "blue" | "accent" | "white";
  dayLabel?: string;
}) {
  return (
    <Link href={href} className="block group">
      <Card
        variant={variant}
        className={cn(
          "relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5",
          status === "upcoming" && "opacity-75"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            {dayLabel && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#062B56]/50 mb-2">
                {dayLabel}
              </span>
            )}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-full bg-white/70 flex items-center justify-center text-sm text-[#062B56]">
                {status === "completed" ? "✓" : status === "today" ? "→" : "○"}
              </span>
              <span className="text-xs font-medium text-[#062B56]/70 bg-white/50 px-3 py-1 rounded-full">
                {typeLabels[type] || type}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#062B56] leading-snug">{title}</h3>
            {subtitle && (
              <p className="text-sm text-[#062B56]/65 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-[#062B56] shadow-sm group-hover:bg-[#FD7035] group-hover:text-white transition-colors shrink-0">
            →
          </div>
        </div>
      </Card>
    </Link>
  );
}
