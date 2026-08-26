"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { speakFrench, stopSpeaking } from "@/lib/tts";
import { Button } from "@/components/ui/Button";
import { AppHeader } from "@/components/layout/AppHeader";
import { LetterTracer } from "@/components/ui/LetterTracer";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";
import { FRENCH_ALPHABET, LETTER_COMBINATIONS } from "@/data/alphabet";
import { useProgress } from "@/lib/store";
import { playCompleteSound } from "@/lib/sounds";

export function AlphabetLesson({
  mode,
  lessonId,
}: {
  mode: "alphabet" | "combinations";
  lessonId: string;
}) {
  const { markDayComplete, addXp } = useProgress();
  const [active, setActive] = useState<string | null>(null);
  const [traceLetter, setTraceLetter] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const playId = useRef(0);

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
          speak: c.speak,
          sub: c.example,
        }));

  const play = async (key: string, speak: string) => {
    const id = ++playId.current;
    stopSpeaking();
    setActive(key);
    if (mode === "alphabet") setTraceLetter(key);
    try {
      await speakFrench(speak, 0.8);
    } finally {
      if (playId.current === id) setActive(null);
    }
  };

  const finish = () => {
    markDayComplete(lessonId);
    addXp(20);
    playCompleteSound();
    setDone(true);
  };

  if (done) {
    return (
      <div className="relative px-5 pt-5 pb-8 space-y-5">
        <ConfettiBurst active />
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
              ? "Հպե՛ք տառին՝ լսելու և գրելու համար"
              : "Հպե՛ք՝ լսելու համակցության արտասանությունը"}
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
              <span className="text-[10px] text-[#062B56]/45">օր. {item.sub}</span>
            )}
          </button>
        ))}
      </div>

      {mode === "alphabet" && traceLetter && (
        <div className="rounded-[28px] bg-white border border-[#062B56]/8 p-4 shadow-[0_8px_30px_rgba(6,43,86,0.06)]">
          <LetterTracer letter={traceLetter} />
        </div>
      )}

      <Button className="w-full" size="lg" onClick={finish}>
        Շարունակել
      </Button>
    </div>
  );
}
