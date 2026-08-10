"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LevelCard } from "@/components/ui/LevelCard";
import { LEVELS } from "@/data/levels";
import type { Level } from "@/lib/types";
import { useProgress } from "@/lib/store";

const features = [
  { icon: "📖", label: "Բառապաշար" },
  { icon: "✏️", label: "Քերականություն" },
  { icon: "🎧", label: "Լսել" },
  { icon: "✍️", label: "Թելադրություն" },
  { icon: "🎤", label: "Խոսել" },
  { icon: "📝", label: "Շաբաթական թեստեր" },
  { icon: "📅", label: "Ամենօրյա պարապմունք" },
  { icon: "📊", label: "Առաջընթացի հետևում" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Level | null>(null);
  const { completeOnboarding } = useProgress();
  const router = useRouter();

  if (step === 0) {
    return (
      <div className="min-h-dvh flex flex-col bg-[#FAFAFA]">
        <div className="relative flex-1 bg-[#C7E0E7] rounded-b-[40px] overflow-hidden flex flex-col items-center justify-center px-6 pt-12 pb-16">
          <span className="star-deco top-10 left-10 animate-soft-pulse" />
          <span className="star-deco top-20 right-14 animate-soft-pulse" style={{ animationDelay: "0.5s" }} />
          <span className="star-deco bottom-24 left-1/4 animate-soft-pulse" style={{ animationDelay: "1s" }} />
          <span className="star-deco top-32 right-1/3 animate-soft-pulse" style={{ animationDelay: "1.5s" }} />

          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#062B56]/50 mb-3 animate-fade-up">
            Le Lingo
          </p>
          <div className="animate-float relative">
            <div className="w-40 h-44 relative">
              <div className="absolute bottom-0 left-2 w-32 h-8 bg-[#062B56] rounded-lg rotate-[-4deg]" />
              <div className="absolute bottom-4 left-4 w-32 h-8 bg-[#062B56]/80 rounded-lg rotate-[-2deg]" />
              <div className="absolute bottom-8 left-6 w-32 h-8 bg-[#062B56]/55 rounded-lg" />
              <div className="absolute bottom-12 left-8 w-32 h-8 bg-white/80 rounded-lg rotate-[2deg]" />
              <div className="absolute -top-2 right-0 h-10 w-10 rounded-full bg-[#FD7035]/40" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-[#062B56] text-center mt-8 animate-fade-up leading-tight">
            Բարի գալուստ
            <br />
            ֆրանսերենի աշխարհ
          </h1>
        </div>

        <div className="px-6 py-8 -mt-6 relative z-10">
          <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(6,43,86,0.08)] p-6 animate-fade-up">
            <p className="text-[#062B56]/70 leading-relaxed text-center mb-5">
              Le Lingo-ն օգնում է հայերեն խոսողներին սովորել ֆրանսերեն՝ բառապաշարի,
              քերականության, լսելու, թելադրության, խոսելու և շաբաթական թեստերի միջոցով։
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 rounded-2xl bg-[#FAFAFA] px-3 py-2.5"
                >
                  <span>{f.icon}</span>
                  <span className="text-sm font-medium text-[#062B56]">{f.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" size="lg" onClick={() => setStep(1)}>
                Սկսել
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-14 w-14"
                onClick={() => setStep(1)}
                aria-label="Հաջորդ"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-5 py-8 pb-10">
      <button
        type="button"
        onClick={() => setStep(0)}
        className="text-[#062B56]/50 mb-4 text-sm"
      >
        ← Վերադառնալ
      </button>
      <h1 className="text-3xl font-extrabold text-[#062B56] animate-fade-up">
        Ընտրե՛ք մակարդակը
      </h1>
      <p className="text-[#062B56]/60 mt-2 mb-6 animate-fade-up">
        Կարող եք ընտրել ինքներդ կամ անցնել տեղադրման թեստ։
      </p>

      <div className="space-y-3 mb-6">
        {LEVELS.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            selected={selected === level.id}
            onSelect={() => setSelected(level.id)}
          />
        ))}
      </div>

      <div className="space-y-3 sticky bottom-4">
        <Button
          className="w-full"
          size="lg"
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            completeOnboarding(selected);
            router.push("/dashboard");
          }}
        >
          Շարունակել {selected ? `(${selected})` : ""}
        </Button>
        <Button
          className="w-full"
          size="lg"
          variant="soft"
          onClick={() => router.push("/placement")}
        >
          Որոշել իմ մակարդակը
        </Button>
      </div>
    </div>
  );
}
