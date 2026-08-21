"use client";

import Image from "next/image";
import Link from "next/link";
import { useProgress } from "@/lib/store";

export function AppHeader({
  showSettings = false,
}: {
  showSettings?: boolean;
}) {
  const { progress } = useProgress();
  const firstName = progress.firstName || progress.name.split(/\s+/)[0] || "Ալեքս";
  const lastName =
    progress.lastName ||
    progress.name.split(/\s+/).slice(1).join(" ") ||
    "";
  const displayName = [firstName, lastName].filter(Boolean).join(" ");
  const initial = (firstName || "Ա").slice(0, 1).toUpperCase();

  return (
    <div className="flex items-center justify-between mb-4 gap-3">
      <Link href="/dashboard" className="flex items-center shrink-0">
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
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="text-right min-w-0">
            <p className="font-bold text-[#062B56] text-sm leading-tight truncate">
              {displayName}
            </p>
            <p className="text-[11px] text-[#062B56]/50">
              {progress.level || "A1"}
            </p>
          </div>
          <Link
            href="/settings"
            className="h-10 w-10 rounded-full bg-[#C7E0E7] overflow-hidden flex items-center justify-center shrink-0 shadow-sm"
            aria-label="Պրոֆիլ"
          >
            {progress.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={progress.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-[#062B56]">{initial}</span>
            )}
          </Link>
          <Link
            href="/settings"
            className="h-10 w-10 rounded-full bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0"
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
        </div>
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
