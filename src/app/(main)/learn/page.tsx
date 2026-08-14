"use client";

import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/lib/store";
import { getWeeklySchedule } from "@/data/weekly";
import { LessonCard } from "@/components/ui/LessonCard";
import { AppHeader, lessonImage } from "@/components/layout/AppHeader";
import { getDayOfWeek } from "@/lib/utils";
import type { Level } from "@/lib/types";

const variants = ["blue", "accent", "blue", "accent", "blue", "accent", "blue"] as const;

export default function LearnPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const schedule = getWeeklySchedule(level);
  const todayIdx = getDayOfWeek();

  return (
    <div className="px-5 pt-5 pb-4 space-y-5">
      <AppHeader showSettings />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#062B56]/50">Մակարդակ {level}</p>
          <h1 className="text-3xl font-extrabold text-[#062B56]">Այս շաբաթ</h1>
        </div>
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
              image={lessonImage(i)}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link href="/vocabulary" className="rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgba(6,43,86,0.06)]">
          <div className="h-20 relative">
            <Image src="/luvr.jpg" alt="" fill className="object-cover" />
          </div>
          <p className="font-bold text-[#062B56] p-3">Բառարան</p>
        </Link>
        <Link href="/dictation" className="rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgba(6,43,86,0.06)]">
          <div className="h-20 relative">
            <Image src="/arka.jpg" alt="" fill className="object-cover" />
          </div>
          <p className="font-bold text-[#062B56] p-3">Թելադրություն</p>
        </Link>
        <Link href="/quiz" className="col-span-2 rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgba(6,43,86,0.06)]">
          <div className="flex items-center gap-3">
            <div className="h-20 w-24 relative shrink-0">
              <Image src="/axjikshun.jpg" alt="" fill className="object-cover" />
            </div>
            <p className="font-bold text-[#062B56]">Quiz — նկարներով</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
