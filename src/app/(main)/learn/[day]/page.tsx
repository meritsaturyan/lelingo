"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store";
import { getDayLesson } from "@/data/weekly";
import { AudioIconButton } from "@/components/ui/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GrammarExercise } from "@/components/exercises/GrammarExercise";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function DayLessonPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = use(params);
  const { progress, addXp, markDayComplete, updateSkill } = useProgress();
  const level = (progress.level || "A1") as Level;
  const lesson = getDayLesson(level, day);
  const [exIndex, setExIndex] = useState(0);
  const [phase, setPhase] = useState<"learn" | "practice" | "done">("learn");
  const [correctCount, setCorrectCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!lesson) return;
    if (lesson.type === "grammar" && lesson.grammarId) {
      router.replace(`/grammar/${lesson.grammarId}`);
    } else if (lesson.type === "weekly-test") {
      router.replace("/weekly-test");
    }
  }, [lesson, router]);

  if (!lesson) {
    return (
      <div className="px-5 py-10">
        <p>Դասը չի գտնվել։</p>
        <Link href="/learn">Վերադառնալ</Link>
      </div>
    );
  }

  if (lesson.type === "grammar" || lesson.type === "weekly-test") {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-[#062B56]/50">Բեռնվում է…</p>
      </div>
    );
  }

  const exercises = lesson.exercises || [];
  const currentEx = exercises[exIndex];

  const finish = () => {
    markDayComplete(lesson.day);
    addXp(25 + correctCount * 5);
    updateSkill("vocabulary", 3);
    setPhase("done");
  };

  if (phase === "done") {
    return (
      <div className="px-5 py-10 space-y-5">
        <Card variant="blue" className="text-center py-8">
          <p className="text-4xl mb-2">🎉</p>
          <h1 className="text-2xl font-extrabold text-[#062B56]">Դասն ավարտված է</h1>
          <p className="text-[#062B56]/70 mt-2">
            Ճիշտ պատասխաններ՝ {correctCount}/{exercises.length}
          </p>
          <p className="text-[#FD7035] font-bold mt-2">
            +{25 + correctCount * 5} XP
          </p>
        </Card>
        <Link href="/learn">
          <Button className="w-full" size="lg">
            Վերադառնալ շաբաթ
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
      <div>
        <p className="text-sm font-medium text-[#062B56]/50">
          {lesson.dayLabelHy} · {lesson.dayLabelFr}
        </p>
        <h1 className="text-2xl font-extrabold text-[#062B56] mt-1">
          {lesson.themeHy}
        </h1>
        <p className="text-[#062B56]/60 mt-1">{lesson.themeFr}</p>
      </div>

      {phase === "learn" && (
        <>
          <div className="space-y-3">
            {lesson.expressions?.map((expr) => (
              <Card key={expr.french} variant="blue">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#062B56]">{expr.french}</h3>
                    <p className="text-[#062B56]/70 mt-1">({expr.armenian})</p>
                    {expr.pronunciation && (
                      <p className="text-xs text-[#062B56]/45 mt-1">
                        [{expr.pronunciation}]
                      </p>
                    )}
                  </div>
                  <AudioIconButton text={expr.french} />
                </div>
                {expr.exampleFr && (
                  <div className="mt-3 rounded-2xl bg-white/70 p-3">
                    <p className="text-sm font-medium text-[#062B56]">
                      Exemple: {expr.exampleFr}
                    </p>
                    <p className="text-sm text-[#062B56]/60 mt-1">
                      ({expr.exampleHy})
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {lesson.rule && (
            <Card variant="accent">
              <p className="text-sm font-semibold text-[#062B56]/60 mb-1">
                La règle
              </p>
              <p className="text-[#062B56] leading-relaxed">{lesson.rule}</p>
            </Card>
          )}

          <Button className="w-full" size="lg" onClick={() => setPhase("practice")}>
            Անցնել վարժություններին
          </Button>
        </>
      )}

      {phase === "practice" && currentEx && (
        <div className="space-y-4">
          <p className="text-sm text-[#062B56]/50">
            Վարժություն {exIndex + 1} / {exercises.length}
          </p>
          <GrammarExercise
            key={currentEx.id}
            exercise={currentEx}
            onComplete={(ok) => {
              if (ok) setCorrectCount((c) => c + 1);
              setTimeout(() => {
                if (exIndex + 1 >= exercises.length) finish();
                else setExIndex((i) => i + 1);
              }, 900);
            }}
          />
        </div>
      )}
    </div>
  );
}
