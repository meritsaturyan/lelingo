"use client";

import Image from "next/image";
import Link from "next/link";

export function AppHeader({
  showSettings = false,
}: {
  showSettings?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <Link href="/dashboard" className="flex items-center">
        <Image
          src="/logo2.png"
          alt="Le Lingo"
          width={140}
          height={44}
          className="h-10 w-auto object-contain"
          priority
        />
      </Link>
      {showSettings && (
        <Link
          href="/settings"
          className="h-10 w-10 rounded-full bg-white shadow-sm overflow-hidden flex items-center justify-center"
          aria-label="Կարգավորումներ"
        >
          <Image
            src="/settings.jpg"
            alt="Settings"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </Link>
      )}
    </div>
  );
}

export function streakImage(streak: number): string {
  if (streak >= 50) return "/kruasan50.jpg";
  if (streak >= 30) return "/kruasan30.jpg";
  if (streak >= 20) return "/kruasan20.jpg";
  if (streak >= 10) return "/kruasan10.jpg";
  if (streak >= 4) return "/kruasan4-9.jpg";
  return "/kruasan1-3.jpg";
}

export const LESSON_IMAGES = [
  "/paris.jpg",
  "/luvr.jpg",
  "/luvr1.jpg",
  "/luvr2.jpg",
  "/cafe.jpg",
  "/arka.jpg",
  "/cafe1.jpg",
  "/axjikshun.jpg",
  "/dior.jpg",
  "/caxik.jpg",
] as const;

export function lessonImage(index: number): string {
  return LESSON_IMAGES[index % LESSON_IMAGES.length];
}
