"use client";

import Link from "next/link";
import { useProgress } from "@/lib/store";
import { getWeeklySchedule } from "@/data/weekly";
import { LessonCard } from "@/components/ui/LessonCard";
import { getDayOfWeek } from "@/lib/utils";
import type { Level } from "@/lib/types";

const variants = ["blue", "accent", "blue", "accent", "blue", "accent", "blue"] as const;

export default function LearnPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const schedule = getWeeklySchedule(level);
  const todayIdx = getDayOfWeek();

  return (
    <div className="px-5 pt-6 pb-4 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#062B56]/50">Մակարդակ {level}</p>
          <h1 className="text-3xl font-extrabold text-[#062B56]">Այս շաբաթ</h1>
        </div>
        <Link
          href="/settings"
          className="h-11 w-11 rounded-2xl bg-[#C7E0E7] flex items-center justify-center"
        >
          📅
        </Link>
      </div>

      <div className="space-y-3">
        {schedule.map((day, i) => {
          const key = `${level}-${day.day}`;
          const completed = !!progress.weeklyCompleted[key];
          const status = completed
            ? "completed"
            : i === todayIdx
              ? "today"
              : "upcoming";
          const href =
            day.type === "weekly-test"
              ? "/weekly-test"
              : day.type === "grammar"
                ? `/grammar/${day.grammarId}`
                : `/learn/${day.day}`;

          return (
            <LessonCard
              key={day.day}
              href={href}
              title={day.themeHy}
              subtitle={
                status === "completed"
                  ? "Ավարտված"
                  : status === "today"
                    ? "Այսօր"
                    : "Սպասվող"
              }
              type={day.type}
              status={status}
              variant={variants[i]}
              dayLabel={`${day.dayLabelHy} · ${day.dayLabelFr}`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link
          href="/vocabulary"
          className="rounded-[24px] bg-white p-4 shadow-[0_8px_30px_rgba(6,43,86,0.06)]"
        >
          <p className="text-xl">👋</p>
          <p className="font-bold text-[#062B56] mt-1">Բառարան</p>
        </Link>
        <Link
          href="/dictation"
          className="rounded-[24px] bg-white p-4 shadow-[0_8px_30px_rgba(6,43,86,0.06)]"
        >
          <p className="text-xl">✍️</p>
          <p className="font-bold text-[#062B56] mt-1">Թելադրություն</p>
        </Link>
      </div>
    </div>
  );
}
