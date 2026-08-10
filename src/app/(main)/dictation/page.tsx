"use client";

import { useMemo, useState } from "react";
import { DICTATION_ITEMS } from "@/data/listening";
import { DictationExercise } from "@/components/exercises/DictationExercise";
import { useProgress } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Level } from "@/lib/types";

export default function DictationPage() {
  const { progress, addXp, recordDictation } = useProgress();
  const level = (progress.level || "A1") as Level;
  const levelOrder: Level[] = ["A1", "A2", "B1", "B2"];
  const allowed = levelOrder.slice(0, levelOrder.indexOf(level) + 1);

  const items = useMemo(
    () => DICTATION_ITEMS.filter((d) => allowed.includes(d.level)),
    [allowed]
  );
  const [index, setIndex] = useState(0);
  const item = items[index];

  const avg =
    progress.dictationHistory.length > 0
      ? Math.round(
          progress.dictationHistory.reduce((a, b) => a + b.score, 0) /
            progress.dictationHistory.length
        )
      : 0;

  if (!item) {
    return (
      <div className="px-5 py-10">
        <p>Թելադրություններ չկան։</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-8 space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold text-[#062B56]">Թելադրություն</h1>
        <p className="text-[#062B56]/60 mt-1">
          {index + 1} / {items.length} · Մակարդակ {level}
        </p>
      </div>

      {progress.dictationHistory.length > 0 && (
        <Card variant="blue" padding="sm">
          <p className="text-sm text-[#062B56]/60">Միջին արդյունք</p>
          <p className="text-2xl font-bold text-[#062B56]">{avg} / 10</p>
        </Card>
      )}

      <DictationExercise
        key={item.id}
        text={item.text}
        hint={item.hintHy}
        onComplete={(score) => {
          addXp(score * 2);
          recordDictation(score);
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
          disabled={index >= items.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Հաջորդ
        </Button>
      </div>
    </div>
  );
}
