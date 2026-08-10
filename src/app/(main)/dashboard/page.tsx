"use client";

import Link from "next/link";
import { useProgress } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StreakCard, WeeklyCalendar } from "@/components/ui/StreakCard";
import { LessonCard } from "@/components/ui/LessonCard";
import { getWeeklySchedule } from "@/data/weekly";
import { getDayOfWeek } from "@/lib/utils";
import type { Level } from "@/lib/types";

const dayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const variants = ["blue", "accent", "blue", "accent"] as const;

export default function DashboardPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const schedule = getWeeklySchedule(level);
  const todayIdx = getDayOfWeek();
  const todayLesson = schedule[todayIdx];
  const weekProgress =
    (Object.keys(progress.weeklyCompleted).filter((k) =>
      k.startsWith(`${level}-`)
    ).length /
      7) *
    100;

  return (
    <div className="px-5 pt-6 pb-4 space-y-5">
      <header className="flex items-center justify-between animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[#C7E0E7] flex items-center justify-center text-lg font-bold text-[#062B56]">
            {progress.name.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm text-[#062B56]/55">Բարև, {progress.name}</p>
            <p className="font-bold text-[#062B56]">
              Մակարդակ {level}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/settings"
            className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#062B56]"
            aria-label="Ծանուցումներ"
          >
            🔔
          </Link>
          <Link
            href="/vocabulary"
            className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#062B56]"
            aria-label="Որոնել"
          >
            🔍
          </Link>
        </div>
      </header>

      <div className="animate-fade-up">
        <ProgressBar value={Math.min(100, (progress.dailyXp / 50) * 100)} height="md" />
        <p className="text-xs text-[#062B56]/50 mt-1.5">
          Այսօրվա XP՝ {progress.dailyXp} / 50
        </p>
      </div>

      <div className="animate-fade-up">
        <h1 className="text-3xl font-extrabold text-[#062B56] leading-tight">
          Այսօրվա առաջընթացը
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3 animate-fade-up">
        {[
          { label: "XP", value: `${progress.dailyXp}`, sub: "այսօր" },
          { label: "Դասեր", value: `${progress.lessonsCompletedToday}`, sub: "ավարտված" },
          { label: "Բառեր", value: `${progress.vocabLearnedToday}`, sub: "սովորած" },
          { label: "Շաբաթ", value: `${Math.round(weekProgress)}%`, sub: "առաջընթաց" },
        ].map((s) => (
          <Card key={s.label} padding="sm" className="text-center">
            <p className="text-2xl font-bold text-[#062B56]">{s.value}</p>
            <p className="text-xs text-[#062B56]/55 mt-0.5">
              {s.label} · {s.sub}
            </p>
          </Card>
        ))}
      </div>

      <StreakCard streak={progress.streak} />
      <WeeklyCalendar completedDays={progress.completedDays} />

      {todayLesson && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#062B56]">Այսօր</h2>
            <Link href="/learn" className="text-sm font-semibold text-[#FD7035]">
              Ամբողջ շաբաթ →
            </Link>
          </div>
          <LessonCard
            href={
              todayLesson.type === "weekly-test"
                ? "/weekly-test"
                : todayLesson.type === "grammar"
                  ? `/grammar/${todayLesson.grammarId}`
                  : `/learn/${todayLesson.day}`
            }
            title={todayLesson.themeHy}
            subtitle={todayLesson.themeFr}
            type={todayLesson.type}
            status="today"
            variant={variants[todayIdx % variants.length]}
            dayLabel={todayLesson.dayLabelHy}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link href="/vocabulary">
          <Card variant="blue" className="h-full">
            <p className="text-2xl mb-1">📚</p>
            <p className="font-bold text-[#062B56]">Բառապաշար</p>
          </Card>
        </Link>
        <Link href="/dictation">
          <Card variant="accent" className="h-full">
            <p className="text-2xl mb-1">✍️</p>
            <p className="font-bold text-[#062B56]">Թելադրություն</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
