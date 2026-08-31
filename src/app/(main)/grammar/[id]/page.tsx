"use client";

import { Suspense, use, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getGrammarById } from "@/data/grammar";
import { AudioPlayer, AudioIconButton } from "@/components/ui/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GrammarExercise } from "@/components/exercises/GrammarExercise";
import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/lib/store";
import { playCompleteSound } from "@/lib/sounds";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";

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

function GrammarTable({
  title,
  headers,
  rows,
  noteHy,
}: {
  title: string;
  headers: string[];
  rows: string[][];
  noteHy?: string;
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
              {headers.map((h) => (
                <th key={h} className="px-4 py-2 text-[#062B56]/60 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r[0]}-${i}`} className="border-b border-[#062B56]/05 last:border-0">
                {r.map((cell, j) => (
                  <td
                    key={`${i}-${j}`}
                    className={
                      j === 0
                        ? "px-4 py-2.5 font-medium text-[#062B56]"
                        : j === 1
                          ? "px-4 py-2.5 text-[#FD7035] font-semibold"
                          : "px-4 py-2.5 text-[#062B56]"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {noteHy && (
        <p className="px-4 py-3 text-sm text-[#062B56]/70 border-t border-[#062B56]/05">
          {noteHy}
        </p>
      )}
    </Card>
  );
}

function GrammarInner({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const lessonKey = searchParams.get("lesson");
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
    "a1-pronoms": "w1-pronoms",
    "a1-etre": "w1-etre",
    "a1-articles": "w2-articles",
    "a1-negation": "w2-negation",
    "a1-questions": "w2-questions",
    "a1-aller": "w3-aller",
    "a1-er-verbs": "w3-er",
    "a1-ir-verbs": "w4-ir",
    "a1-irregular": "w4-irr",
    "a1-articles-indef": "w5-articles-indef",
    "a1-articles-part": "w5-articles-part",
    "a1-articles-neg": "w5-articles-neg",
    "a1-quantite": "w5-quantite",
    "a1-contraction-a": "w6-contraction-a",
    "a1-contraction-de": "w6-contraction-de",
  };

  const finish = () => {
    const day = lessonKey || dayMap[lesson.id] || "tuesday";
    markDayComplete(day);
    addXp(30 + correct * 5);
    updateSkill("grammar", 4);
    playCompleteSound();
    setPhase("done");
  };

  if (phase === "done") {
    const score = Math.round((correct / lesson.exercises.length) * 100);
    return (
      <div className="relative px-5 pt-5 py-10 space-y-5">
        <ConfettiBurst active />
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

          {lesson.listenItems && lesson.listenItems.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-bold text-[#062B56]">Լսե՛ք դերանունները</h2>
              <div className="grid grid-cols-2 gap-2">
                {lesson.listenItems.map((item) => (
                  <Card key={item.french} className="!p-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xl font-extrabold text-[#062B56]">{item.french}</p>
                      <p className="text-sm text-[#062B56]/60 truncate">{item.armenian}</p>
                    </div>
                    <AudioIconButton text={item.french} rate={0.85} />
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Card variant="accent">
            <p className="text-sm font-semibold text-[#062B56]/60 mb-1">Կանոն</p>
            <p className="text-[#062B56] font-medium whitespace-pre-line">{lesson.rule}</p>
          </Card>

          {lesson.tables?.map((t) => (
            <GrammarTable
              key={t.title}
              title={t.title}
              headers={t.headers}
              rows={t.rows}
              noteHy={t.noteHy}
            />
          ))}

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
                <div>
                  <p className="text-lg font-bold text-[#062B56]">{ex.french}</p>
                  <p className="text-[#062B56]/65 mt-1">{ex.armenian}</p>
                </div>
                <div className="mt-3">
                  <AudioPlayer text={ex.french} label="Լսել" />
                </div>
              </Card>
            ))}
          </div>

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
              if (exIndex + 1 >= lesson.exercises.length) finish();
              else setExIndex((i) => i + 1);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function GrammarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="px-5 py-10 text-[#062B56]/50">Բեռնվում է…</div>}>
      <GrammarInner id={id} />
    </Suspense>
  );
}
