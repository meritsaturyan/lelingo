"use client";

import Link from "next/link";
import { LEVELS } from "@/data/levels";
import { LevelCard } from "@/components/ui/LevelCard";
import { useProgress } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";

export default function SettingsPage() {
  const { progress, setLevel, resetAll } = useProgress();

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <Link href="/dashboard" className="text-sm text-[#062B56]/50">
        ← Գլխավոր
      </Link>
      <h1 className="text-3xl font-extrabold text-[#062B56]">Կարգավորումներ</h1>

      <Card>
        <p className="text-sm text-[#062B56]/50">Օգտատեր</p>
        <p className="text-xl font-bold text-[#062B56]">{progress.name}</p>
        <p className="text-[#062B56]/60 mt-1">
          Ընթացիկ մակարդակ՝ <strong>{progress.level}</strong>
        </p>
      </Card>

      <div>
        <h2 className="font-bold text-[#062B56] mb-3">Փոխել մակարդակը</h2>
        <p className="text-sm text-[#062B56]/60 mb-3">
          Դուք միշտ կարող եք փոխել մակարդակը։ Առաջընթացը կպահպանվի։
        </p>
        <div className="space-y-3">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              selected={progress.level === level.id}
              onSelect={() => setLevel(level.id as Level)}
            />
          ))}
        </div>
      </div>

      <Link href="/placement">
        <Button variant="secondary" className="w-full" size="lg">
          Կրկին անցնել տեղադրման թեստը
        </Button>
      </Link>

      <Button
        variant="ghost"
        className="w-full text-[#FD7035]"
        onClick={() => {
          if (confirm("Վերակայե՞լ ամբողջ առաջընթացը։")) {
            resetAll();
            window.location.href = "/onboarding";
          }
        }}
      >
        Վերակայել առաջընթացը
      </Button>
    </div>
  );
}
