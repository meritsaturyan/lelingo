"use client";

import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/lib/store";
import { getWeeklySchedule } from "@/data/weekly";
import { getA1Month, isWeekUnlocked } from "@/data/a1-month";
import { LessonCard } from "@/components/ui/LessonCard";
import { AppHeader, lessonImage } from "@/components/layout/AppHeader";
import { getDayOfWeek } from "@/lib/utils";
import type { Level } from "@/lib/types";

const variants = ["blue", "accent", "blue", "accent", "blue", "accent", "blue"] as const;

function lessonHref(day: {
  type: string;
  grammarId?: string;
  id?: string;
  day: string;
}) {
  const key = day.id || day.day;
  if (day.type === "weekly-test") return `/weekly-test?lesson=${key}`;
  if (day.type === "grammar") return `/grammar/${day.grammarId}?lesson=${key}`;
  if (day.type === "alphabet") return `/learn/${key}`;
  if (day.type === "combinations") return `/learn/${key}`;
  if (day.type === "reading") return `/learn/${key}`;
  return `/learn/${key}`;
}

export default function LearnPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;

  if (level === "A1") {
    const months = getA1Month();
    return (
      <div className="px-5 pt-5 pb-4 space-y-6">
        <AppHeader showSettings />

        <div>
          <p className="text-sm text-[#062B56]/50">A1 · ծրագիր</p>
          <h1 className="text-3xl font-extrabold text-[#062B56]">A1 ուսումնական ծրագիր</h1>
          <p className="text-[#062B56]/60 mt-1">
            Մոտ 5–6 շաբաթ · ավարտե՛ք շաբաթը՝ հաջորդը բացելու համար։
          </p>
        </div>

        {months.map((week) => {
          const unlocked = isWeekUnlocked(week.week, progress.weeklyCompleted, level);
          return (
            <section key={week.week} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#062B56]">{week.titleHy}</h2>
                  <p className="text-sm text-[#062B56]/50">{week.titleFr}</p>
                </div>
                {!unlocked && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#062B56]/10 text-[#062B56]/60">
                    🔒 Փակ
                  </span>
                )}
              </div>

              <div className={`space-y-3 ${!unlocked ? "opacity-45 pointer-events-none" : ""}`}>
                {week.lessons.map((day, i) => {
                  const key = `${level}-${day.id}`;
                  const completed = !!progress.weeklyCompleted[key];
                  const status = completed
                    ? "completed"
                    : unlocked
                      ? "today"
                      : "upcoming";

                  return (
                    <LessonCard
                      key={day.id}
                      href={unlocked ? lessonHref(day) : "#"}
                      title={day.themeHy}
                      subtitle={
                        !unlocked
                          ? "Նախ ավարտե՛ք նախորդ շաբաթը"
                          : completed
                            ? "Ավարտված"
                            : "Բաց է"
                      }
                      type={day.type}
                      status={status}
                      variant={variants[i % variants.length]}
                      dayLabel={`${day.dayLabelHy} · ${day.dayLabelFr}`}
                      image={lessonImage(i)}
                      locked={!unlocked}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}

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
        </div>
      </div>
    );
  }

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
          const href = lessonHref(day);

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
    </div>
  );
}
