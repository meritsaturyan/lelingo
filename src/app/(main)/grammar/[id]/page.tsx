"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getGrammarById } from "@/data/grammar";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GrammarExercise } from "@/components/exercises/GrammarExercise";
import { useProgress } from "@/lib/store";

export default function GrammarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lesson = getGrammarById(id);
  const [phase, setPhase] = useState<"explain" | "practice" | "done">("explain");
  const [exIndex, setExIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const { addXp, markDayComplete, updateSkill, progress } = useProgress();

  if (!lesson) {
    return (
      <div className="px-5 py-10">
        <p>Քերականության դասը չի գտնվել։</p>
        <Link href="/learn">Վերադառնալ</Link>
      </div>
    );
  }

  const dayMap: Record<string, string> = {
    "a1-present": "tuesday",
    "a1-articles": "thursday",
    "a1-etre-avoir": "saturday",
    "a2-passe-compose": "tuesday",
    "a2-futur-proche": "thursday",
    "b1-subjonctif": "tuesday",
    "b1-conditionnel": "thursday",
    "b2-discours": "tuesday",
  };

  const finish = () => {
    const day = dayMap[lesson.id] || "tuesday";
    markDayComplete(day);
    addXp(30 + correct * 5);
    updateSkill("grammar", 4);
    setPhase("done");
  };

  if (phase === "done") {
    const score = Math.round((correct / lesson.exercises.length) * 100);
    return (
      <div className="px-5 py-10 space-y-5">
        <Card variant="blue" className="text-center py-8">
          <h1 className="text-2xl font-extrabold text-[#062B56]">Արդյունք</h1>
          <p className="text-5xl font-bold text-[#FD7035] mt-3">{score}%</p>
          <p className="text-[#062B56]/70 mt-2">
            {correct}/{lesson.exercises.length} ճիշտ
          </p>
        </Card>
        <Link href="/learn">
          <Button className="w-full" size="lg">
            Վերադառնալ
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-8 space-y-5">
      <Link href="/learn" className="text-sm text-[#062B56]/50">
        ← Վերադառնալ
      </Link>

      <div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#C7E0E7] text-[#062B56]">
          {progress.level} · Քերականություն
        </span>
        <h1 className="text-3xl font-extrabold text-[#062B56] mt-3">
          {lesson.titleFr}
        </h1>
        <p className="text-[#062B56]/60 mt-1">{lesson.titleHy}</p>
      </div>

      {phase === "explain" && (
        <>
          <Card>
            <p className="text-[#062B56] leading-relaxed">{lesson.explanation}</p>
          </Card>

          <Card variant="accent">
            <p className="text-sm font-semibold text-[#062B56]/60 mb-1">Կանոն</p>
            <p className="text-[#062B56] font-medium">{lesson.rule}</p>
          </Card>

          <div className="space-y-3">
            <h2 className="font-bold text-[#062B56]">Օրինակներ</h2>
            {lesson.examples.map((ex) => (
              <Card key={ex.french} variant="blue">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-[#062B56]">{ex.french}</p>
                    <p className="text-[#062B56]/65 mt-1">{ex.armenian}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <AudioPlayer text={ex.french} label="Լսել" />
                </div>
              </Card>
            ))}
          </div>

          <p className="text-sm text-[#062B56]/55 text-center">
            Նախ լսե՛ք արտասանությունը, ապա անցե՛ք վարժություններին։
          </p>

          <Button className="w-full" size="lg" onClick={() => setPhase("practice")}>
            Սկսել վարժությունները
          </Button>
        </>
      )}

      {phase === "practice" && (
        <div className="space-y-4">
          <p className="text-sm text-[#062B56]/50">
            Վարժություն {exIndex + 1} / {lesson.exercises.length}
          </p>
          <GrammarExercise
            key={lesson.exercises[exIndex].id}
            exercise={lesson.exercises[exIndex]}
            onComplete={(ok) => {
              if (ok) setCorrect((c) => c + 1);
              setTimeout(() => {
                if (exIndex + 1 >= lesson.exercises.length) finish();
                else setExIndex((i) => i + 1);
              }, 900);
            }}
          />
        </div>
      )}
    </div>
  );
}
