"use client";

import { useState } from "react";
import Link from "next/link";
import { speakFrench } from "@/lib/tts";
import { Button } from "@/components/ui/Button";
import { AppHeader } from "@/components/layout/AppHeader";
import { FRENCH_ALPHABET, LETTER_COMBINATIONS } from "@/data/alphabet";
import { useProgress } from "@/lib/store";

export function AlphabetLesson({
  mode,
  lessonId,
}: {
  mode: "alphabet" | "combinations";
  lessonId: string;
}) {
  const { markDayComplete, addXp } = useProgress();
  const [active, setActive] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const items =
    mode === "alphabet"
      ? FRENCH_ALPHABET.map((a) => ({
          key: a.letter,
          label: a.letter,
          speak: a.speak,
          sub: a.name,
        }))
      : LETTER_COMBINATIONS.map((c) => ({
          key: c.combo,
          label: c.combo,
          speak: c.example,
          sub: c.example,
        }));

  const play = async (key: string, speak: string) => {
    setActive(key);
    await speakFrench(speak, 0.85);
    setActive(null);
  };

  const finish = () => {
    markDayComplete(lessonId);
    addXp(20);
    setDone(true);
  };

  if (done) {
    return (
      <div className="px-5 pt-5 pb-8 space-y-5">
        <AppHeader />
        <div className="rounded-[28px] bg-[#C7E0E7] p-8 text-center space-y-3">
          <h1 className="text-2xl font-extrabold text-[#062B56]">Դասն ավարտված է</h1>
          <p className="text-[#062B56]/70">+20 XP</p>
        </div>
        <Link href="/learn">
          <Button className="w-full" size="lg">
            Վերադառնալ ամիս
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <Link href="/learn" className="text-sm text-[#062B56]/50">
        ← Վերադառնալ
      </Link>

      <div className="rounded-[28px] bg-[#C7E0E7] p-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#062B56]">
            {mode === "alphabet" ? "Alphabets" : "Combinaisons"}
          </h1>
          <p className="text-[#062B56]/70 mt-1">
            {mode === "alphabet"
              ? "Հպե՛ք տառերին՝ լսելու համար"
              : "Հպե՛ք տառային համակցություններին"}
          </p>
        </div>
        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-[#062B56] font-extrabold shadow-sm shrink-0">
          {mode === "alphabet" ? "ABC" : "ou"}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => play(item.key, item.speak)}
            className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
              active === item.key
                ? "border-[#FD7035] bg-[#FD7035]/10 scale-[0.98]"
                : "border-[#C7E0E7] bg-white"
            }`}
          >
            <span className="text-3xl font-extrabold text-[#062B56]">{item.label}</span>
            <span className="text-[#062B56]/50 text-xs">🔊</span>
            {mode === "combinations" && (
              <span className="text-[10px] text-[#062B56]/45">{item.sub}</span>
            )}
          </button>
        ))}
      </div>

      <Button className="w-full" size="lg" onClick={finish}>
        Շարունակել
      </Button>
    </div>
  );
}
