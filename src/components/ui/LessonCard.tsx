"use client";

import Link from "next/link";
import Image from "next/image";
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
  alphabet: "Այբուբեն",
  combinations: "Համակցություններ",
  reading: "Ընթերցանություն",
};

export function LessonCard({
  href,
  title,
  subtitle,
  type,
  status,
  variant = "blue",
  dayLabel,
  image,
  locked,
}: {
  href: string;
  title: string;
  subtitle?: string;
  type: string;
  status: "completed" | "today" | "upcoming";
  variant?: "blue" | "accent" | "white";
  dayLabel?: string;
  image?: string;
  locked?: boolean;
}) {
  const inner = (
      <Card
        variant={variant}
        className={cn(
          "relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5 !p-0",
          status === "upcoming" && "opacity-85",
          locked && "grayscale-[0.3]"
        )}
      >
        <div className="flex">
          {image && (
            <div className="w-24 shrink-0 relative min-h-[110px]">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          )}
          <div className="flex-1 p-4 flex items-start justify-between gap-3">
            <div>
              {dayLabel && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#062B56]/50 mb-2">
                  {dayLabel}
                </span>
              )}
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-7 w-7 rounded-full bg-white/70 flex items-center justify-center text-sm text-[#062B56]">
                  {locked ? "🔒" : status === "completed" ? "✓" : status === "today" ? "→" : "○"}
                </span>
                <span className="text-xs font-medium text-[#062B56]/70 bg-white/50 px-3 py-1 rounded-full">
                  {typeLabels[type] || type}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#062B56] leading-snug">{title}</h3>
              {subtitle && (
                <p className="text-sm text-[#062B56]/65 mt-1">{subtitle}</p>
              )}
            </div>
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#062B56] shadow-sm group-hover:bg-[#FD7035] group-hover:text-white transition-colors shrink-0">
              {locked ? "·" : "→"}
            </div>
          </div>
        </div>
      </Card>
  );

  if (locked) {
    return <div className="block">{inner}</div>;
  }

  return (
    <Link href={href} className="block group">
      {inner}
    </Link>
  );
}
