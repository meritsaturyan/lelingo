"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SPEAKING_PROMPTS } from "@/data/listening";
import { SpeakingExercise } from "@/components/exercises/SpeakingExercise";
import { useProgress } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";

export default function SpeakPage() {
  const { progress, addXp, recordSpeaking } = useProgress();
  const level = (progress.level || "A1") as Level;
  const levelOrder: Level[] = ["A1", "A2", "B1", "B2"];
  const allowed = levelOrder.slice(0, levelOrder.indexOf(level) + 1);

  const prompts = useMemo(
    () => SPEAKING_PROMPTS.filter((p) => allowed.includes(p.level)),
    [allowed]
  );
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const prompt = prompts[index];

  if (!prompts.length) {
    return (
      <div className="px-5 py-10">
        <AppHeader />
        <p>Խոսելու թեմաներ չկան։</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="px-5 pt-5 pb-8 space-y-5">
        <AppHeader />
        <Card variant="blue" className="text-center py-10 space-y-4">
          <div className="mx-auto h-24 w-24 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/speech.jpg"
              alt="Speech"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-[#062B56]">Վերջ</h1>
          <p className="text-[#062B56]/70">
            Դու անցար բոլոր խոսելու թեմաները։ Շատ լավ է։
          </p>
        </Card>
        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            setFinished(false);
            setIndex(0);
          }}
        >
          Սկսել նորից
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden shadow-sm shrink-0">
          <Image
            src="/speech.jpg"
            alt="Speech"
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[#062B56]">Խոսել</h1>
          <p className="text-[#062B56]/60 mt-0.5">
            Թեմա {index + 1} / {prompts.length} · {level}
          </p>
        </div>
      </div>

      <SpeakingExercise
        key={prompt.id}
        prompt={prompt}
        onComplete={(score) => {
          addXp(Math.round(score / 5));
          recordSpeaking(score);
        }}
      />

      <div className="flex gap-3">
        <Button
          variant="soft"
          className="flex-1"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          Նախորդ
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => {
            if (index >= prompts.length - 1) setFinished(true);
            else setIndex((i) => i + 1);
          }}
        >
          {index >= prompts.length - 1 ? "Վերջ" : "Հաջորդ թեմա"}
        </Button>
      </div>
    </div>
  );
}
