"use client";

import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { StreakCard, WeeklyCalendar } from "@/components/ui/StreakCard";
import { LessonCard } from "@/components/ui/LessonCard";
import { AppHeader, lessonImage } from "@/components/layout/AppHeader";
import { getWeeklySchedule } from "@/data/weekly";
import { getA1Month, isWeekUnlocked, isA1CourseComplete } from "@/data/a1-month";
import { getDayOfWeek } from "@/lib/utils";
import type { DayLesson, Level } from "@/lib/types";
import { DiplomaSection } from "@/components/ui/DiplomaSection";
import { LearningMap } from "@/components/ui/LearningMap";

function lessonHref(day: DayLesson) {
  const key = day.id || String(day.day);
  if (day.type === "weekly-test") return `/weekly-test?lesson=${key}`;
  if (day.type === "grammar") return `/grammar/${day.grammarId}?lesson=${key}`;
  return `/learn/${key}`;
}

/** Next open A1 lesson from the month plan (not calendar weekday). */
function getA1DashboardLesson(
  weeklyCompleted: Record<string, boolean>
): DayLesson | undefined {
  const months = getA1Month();
  for (const week of months) {
    if (!isWeekUnlocked(week.week, weeklyCompleted, "A1")) continue;
    for (const lesson of week.lessons) {
      if (!weeklyCompleted[`A1-${lesson.id}`]) return lesson;
    }
  }
  // All done — show last lesson
  const lastWeek = months[months.length - 1];
  return lastWeek?.lessons[lastWeek.lessons.length - 1];
}

export default function DashboardPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const todayIdx = getDayOfWeek();

  const todayLesson: DayLesson | undefined =
    level === "A1"
      ? getA1DashboardLesson(progress.weeklyCompleted)
      : getWeeklySchedule(level)[todayIdx];

  const imageIdx =
    level === "A1" && todayLesson?.week
      ? (todayLesson.week - 1) * 8 +
        (getA1Month()
          .find((w) => w.week === todayLesson.week)
          ?.lessons.findIndex((l) => l.id === todayLesson.id) ?? 0)
      : todayIdx;

  const diplomaUnlocked =
    level === "A1" && isA1CourseComplete(progress.weeklyCompleted, level);

  return (
    <div className="px-5 pt-5 pb-4 space-y-5">
      <AppHeader showSettings />

      <LearningMap level={level} />

      <StreakCard streak={progress.streak} />
      <WeeklyCalendar completedDays={progress.completedDays} />

      {todayLesson && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#062B56]">Հաջորդ դաս</h2>
            <Link href="/learn" className="text-sm font-semibold text-[#FD7035]">
              Ամբողջ ծրագիր →
            </Link>
          </div>
          <LessonCard
            href={lessonHref(todayLesson)}
            title={todayLesson.themeHy}
            subtitle={todayLesson.themeFr}
            type={todayLesson.type}
            status="today"
            variant="blue"
            dayLabel={`${todayLesson.dayLabelHy} · ${todayLesson.dayLabelFr}`}
            image={lessonImage(imageIdx)}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link href="/vocabulary">
          <Card variant="blue" className="h-full !p-0 overflow-hidden">
            <div className="h-24 relative">
              <Image src="/paris.jpg" alt="" fill className="object-cover" />
            </div>
            <p className="font-bold text-[#062B56] p-4">Բառապաշար</p>
          </Card>
        </Link>
        <Link href="/dictation">
          <Card variant="accent" className="h-full !p-0 overflow-hidden">
            <div className="h-24 relative">
              <Image src="/cafe.jpg" alt="" fill className="object-cover" />
            </div>
            <p className="font-bold text-[#062B56] p-4">Թելադրություն</p>
          </Card>
        </Link>
        <Link href="/quiz" className="col-span-2">
          <Card variant="blue" className="!p-0 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="h-24 w-28 relative shrink-0">
                <Image src="/caxik.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="pr-4">
                <p className="font-bold text-[#062B56] text-lg">Quiz</p>
                <p className="text-sm text-[#062B56]/65">
                  Նկարներով բառապաշարի վարժություն
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {level === "A1" && <DiplomaSection unlocked={diplomaUnlocked} />}
    </div>
  );
}
