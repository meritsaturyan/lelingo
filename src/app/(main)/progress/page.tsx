"use client";

import Link from "next/link";
import { useProgress } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { ProgressBar, ProgressRing } from "@/components/ui/ProgressBar";
import { StreakCard } from "@/components/ui/StreakCard";
import { Button } from "@/components/ui/Button";

export default function ProgressPage() {
  const { progress } = useProgress();
  const skills = [
    { key: "grammar", label: "Քերականություն", color: "#062B56" },
    { key: "vocabulary", label: "Բառապաշար", color: "#FD7035" },
    { key: "listening", label: "Լսել", color: "#C7E0E7" },
    { key: "speaking", label: "Խոսել", color: "#062B56" },
    { key: "dictation", label: "Թելադրություն", color: "#FD7035" },
  ] as const;

  const weeklyPct = Math.round(
    (Object.keys(progress.weeklyCompleted).filter((k) =>
      k.startsWith(`${progress.level}-`)
    ).length /
      7) *
      100
  );

  return (
    <div className="px-5 pt-6 pb-8 space-y-5">
      <h1 className="text-3xl font-extrabold text-[#062B56]">Առաջընթաց</h1>

      <Card variant="blue" className="text-center py-6">
        <p className="text-sm text-[#062B56]/60">Ընթացիկ մակարդակ</p>
        <p className="text-5xl font-extrabold text-[#062B56] mt-1">
          {progress.level}
        </p>
        <p className="text-2xl font-bold text-[#FD7035] mt-3">
          {progress.xp.toLocaleString()} XP
        </p>
      </Card>

      <StreakCard streak={progress.streak} />

      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-[#062B56]">Շաբաթական առաջընթաց</p>
          <p className="font-bold text-[#FD7035]">{weeklyPct}%</p>
        </div>
        <ProgressBar value={weeklyPct} height="md" />
      </Card>

      <div className="flex flex-wrap justify-center gap-4 py-2">
        {skills.map((s) => (
          <ProgressRing
            key={s.key}
            value={progress.skillProgress[s.key]}
            label={s.label}
            color={s.color}
            size={100}
          />
        ))}
      </div>

      <Card>
        <h2 className="font-bold text-[#062B56] mb-3">Մանրամասներ</h2>
        <div className="space-y-4">
          {skills.map((s) => (
            <div key={s.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#062B56]/70">{s.label}</span>
                <span className="font-semibold text-[#062B56]">
                  {progress.skillProgress[s.key]}%
                </span>
              </div>
              <ProgressBar
                value={progress.skillProgress[s.key]}
                color="navy"
              />
            </div>
          ))}
        </div>
      </Card>

      {progress.weeklyTestScores.length > 0 && (
        <Card>
          <h2 className="font-bold text-[#062B56] mb-3">Շաբաթվա թեստեր</h2>
          <div className="space-y-2">
            {progress.weeklyTestScores.slice(-5).reverse().map((t, i) => (
              <div
                key={`${t.date}-${i}`}
                className="flex justify-between text-sm py-2 border-b border-[#062B56]/10 last:border-0"
              >
                <span className="text-[#062B56]/60">{t.date}</span>
                <span className="font-semibold text-[#062B56]">
                  {t.score}% · +{t.xp} XP
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Link href="/settings">
        <Button variant="soft" className="w-full" size="lg">
          Փոխել մակարդակը
        </Button>
      </Link>
    </div>
  );
}
