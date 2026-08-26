"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WEEKLY_TEST_A1 } from "@/data/weekly";
import { GrammarExercise } from "@/components/exercises/GrammarExercise";
import { DictationExercise } from "@/components/exercises/DictationExercise";
import { SpeakingExercise } from "@/components/exercises/SpeakingExercise";
import { TestResult } from "@/components/ui/TestResult";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/lib/store";
import { SPEAKING_PROMPTS } from "@/data/listening";
import { playCompleteSound } from "@/lib/sounds";

type FlatItem = {
  sectionId: string;
  sectionTitle: string;
  skill: string;
  exercise: (typeof WEEKLY_TEST_A1)[0]["exercises"][0];
};

function WeeklyTestInner() {
  const searchParams = useSearchParams();
  const lessonKey = searchParams.get("lesson") || "sunday";

  const flat: FlatItem[] = WEEKLY_TEST_A1.flatMap((section) =>
    section.exercises.map((exercise) => ({
      sectionId: section.id,
      sectionTitle: section.titleHy,
      skill: section.skill,
      exercise,
    }))
  );

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<{ skill: string; correct: boolean }[]>([]);
  const [done, setDone] = useState(false);
  const { recordWeeklyTest, progress, markDayComplete } = useProgress();

  const current = flat[index];

  const finish = (all: { skill: string; correct: boolean }[]) => {
    const correct = all.filter((r) => r.correct).length;
    const score = Math.round((correct / all.length) * 100);
    const xp = Math.round(score * 0.8) + 20;
    recordWeeklyTest(score, xp);
    markDayComplete(lessonKey);
    playCompleteSound();
    setDone(true);
  };

  const recordAndNext = (correct: boolean) => {
    const next = [...results, { skill: current.skill, correct }];
    setResults(next);
    if (index + 1 >= flat.length) finish(next);
    else setIndex((i) => i + 1);
  };

  if (done) {
    const correct = results.filter((r) => r.correct).length;
    const score = Math.round((correct / results.length) * 100);
    const xp = Math.round(score * 0.8) + 20;
    const bySkill = (skill: string) => {
      const items = results.filter((r) => r.skill === skill);
      const c = items.filter((r) => r.correct).length;
      return `${c}/${items.length}`;
    };

    return (
      <div className="px-5 py-8">
        <TestResult
          title="Շաբաթվա թեստ"
          score={score}
          xp={xp}
          details={[
            { label: "Ճիշտ պատասխաններ", value: `${correct}/${results.length}` },
            { label: "Բառապաշար", value: bySkill("vocabulary") },
            { label: "Քերականություն", value: bySkill("grammar") },
            { label: "Լսել", value: bySkill("listening") },
            { label: "Ընթերցանություն", value: bySkill("reading") },
            { label: "Թելադրություն", value: bySkill("dictation") },
            { label: "Խոսել", value: bySkill("speaking") },
          ]}
          primaryHref="/dashboard"
          primaryLabel="Գլխավոր էջ"
          secondaryHref="/learn"
          secondaryLabel="Ամսվա պլան"
        />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="px-5 py-10 space-y-5">
        <Card variant="blue" className="text-center py-8">
          <h1 className="text-3xl font-extrabold text-[#062B56]">Շաբաթվա թեստ</h1>
          <p className="text-[#062B56]/70 mt-3 leading-relaxed px-2">
            Թեստը պարունակում է այս շաբաթ ուսումնասիրված նյութը։
          </p>
          <p className="text-sm text-[#062B56]/50 mt-3">
            {flat.length} հարց · Մակարդակ {progress.level}
          </p>
        </Card>
        <Button className="w-full" size="lg" onClick={() => setStarted(true)}>
          Սկսել թեստը
        </Button>
      </div>
    );
  }

  const speakingPrompt = SPEAKING_PROMPTS[0];

  return (
    <div className="px-5 pt-6 pb-8 space-y-5">
      <div>
        <div className="flex justify-between text-sm text-[#062B56]/60 mb-2">
          <span>
            {index + 1} / {flat.length}
          </span>
          <span>{current.sectionTitle}</span>
        </div>
        <ProgressBar value={((index + 1) / flat.length) * 100} />
      </div>

      {current.exercise.type === "dictation" && current.exercise.audioText ? (
        <DictationExercise
          key={current.exercise.id}
          text={current.exercise.audioText}
          onComplete={(score) => recordAndNext(score >= 7)}
        />
      ) : current.exercise.type === "speaking" ? (
        <SpeakingExercise
          key={current.exercise.id}
          prompt={speakingPrompt}
          onComplete={(score) => recordAndNext(score >= 50)}
        />
      ) : (
        <GrammarExercise
          key={current.exercise.id}
          exercise={current.exercise}
          onComplete={(ok) => recordAndNext(ok)}
        />
      )}
    </div>
  );
}

export default function WeeklyTestPage() {
  return (
    <Suspense fallback={<div className="px-5 py-10 text-[#062B56]/50">Բեռնվում է…</div>}>
      <WeeklyTestInner />
    </Suspense>
  );
}
