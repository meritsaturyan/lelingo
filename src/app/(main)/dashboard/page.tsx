"use client";

import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { StreakCard, WeeklyCalendar } from "@/components/ui/StreakCard";
import { LessonCard } from "@/components/ui/LessonCard";
import { LevelProgressVideos } from "@/components/ui/LevelProgressVideos";
import { AppHeader, lessonImage } from "@/components/layout/AppHeader";
import { getWeeklySchedule } from "@/data/weekly";
import { getDayOfWeek } from "@/lib/utils";
import type { Level } from "@/lib/types";

export default function DashboardPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const schedule = getWeeklySchedule(level);
  const todayIdx = getDayOfWeek();
  const todayLesson = schedule[todayIdx];

  return (
    <div className="px-5 pt-5 pb-4 space-y-5">
      <AppHeader showSettings />

      <LevelProgressVideos level={level} />

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
            variant="blue"
            dayLabel={todayLesson.dayLabelHy}
            image={lessonImage(todayIdx)}
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
    </div>
  );
}
