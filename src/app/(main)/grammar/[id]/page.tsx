"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getGrammarById } from "@/data/grammar";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GrammarExercise } from "@/components/exercises/GrammarExercise";
import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/lib/store";

const ER_TABLE = [
  ["Je", "-e", "je parle"],
  ["Tu", "-es", "tu parles"],
  ["Il / Elle", "-e", "il parle"],
  ["Nous", "-ons", "nous parlons"],
  ["Vous", "-ez", "vous parlez"],
  ["Ils / Elles", "-ent", "ils parlent"],
];

const IR_TABLE = [
  ["Je", "-is", "je finis"],
  ["Tu", "-is", "tu finis"],
  ["Il / Elle", "-it", "il finit"],
  ["Nous", "-issons", "nous finissons"],
  ["Vous", "-issez", "vous finissez"],
  ["Ils / Elles", "-issent", "ils finissent"],
];

function ConjugationTable({
  title,
  rows,
}: {
  title: string;
  rows: string[][];
}) {
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="px-4 py-3 bg-[#C7E0E7]">
        <p className="font-bold text-[#062B56]">{title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#062B56]/10 text-left">
              <th className="px-4 py-2 text-[#062B56]/60 font-semibold">Sujet</th>
              <th className="px-4 py-2 text-[#062B56]/60 font-semibold">Terminaison</th>
              <th className="px-4 py-2 text-[#062B56]/60 font-semibold">Exemple</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-[#062B56]/05 last:border-0">
                <td className="px-4 py-2.5 font-medium text-[#062B56]">{r[0]}</td>
                <td className="px-4 py-2.5 text-[#FD7035] font-semibold">{r[1]}</td>
                <td className="px-4 py-2.5 text-[#062B56]">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

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
    "a1-pronoms": "tuesday",
    "a1-etre": "tuesday",
    "a1-articles": "thursday",
    "a1-er-verbs": "saturday",
    "a1-questions": "thursday",
    "a1-aller": "saturday",
    "a1-negation": "tuesday",
    "a1-ir-verbs": "thursday",
    "a1-irregular": "saturday",
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
      <div className="px-5 pt-5 py-10 space-y-5">
        <AppHeader />
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
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
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
            <p className="text-[#062B56] leading-relaxed whitespace-pre-line">
              {lesson.explanation}
            </p>
          </Card>

          <Card variant="accent">
            <p className="text-sm font-semibold text-[#062B56]/60 mb-1">Կանոն</p>
            <p className="text-[#062B56] font-medium whitespace-pre-line">{lesson.rule}</p>
          </Card>

          {lesson.id === "a1-er-verbs" && (
            <ConjugationTable
              title="Terminaisons : -e, -es, -e, -ons, -ez, -ent"
              rows={ER_TABLE}
            />
          )}
          {lesson.id === "a1-ir-verbs" && (
            <ConjugationTable
              title="Terminaisons : -is, -is, -it, -issons, -issez, -issent"
              rows={IR_TABLE}
            />
          )}

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
