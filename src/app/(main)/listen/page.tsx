"use client";

import { useMemo, useState } from "react";
import { LISTENING_EXERCISES } from "@/data/listening";
import { useProgress } from "@/lib/store";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Level } from "@/lib/types";

export default function ListenPage() {
  const { progress, addXp, updateSkill } = useProgress();
  const level = (progress.level || "A1") as Level;
  const levelOrder: Level[] = ["A1", "A2", "B1", "B2"];
  const allowed = levelOrder.slice(0, levelOrder.indexOf(level) + 1);

  const exercises = useMemo(
    () => LISTENING_EXERCISES.filter((e) => allowed.includes(e.level)),
    [allowed]
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [replays, setReplays] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const ex = exercises[index];

  if (!ex) {
    return (
      <div className="px-5 py-10">
        <p>Լսելու վարժություններ չկան այս մակարդակի համար։</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="px-5 py-10 space-y-5">
        <Card variant="blue" className="text-center py-8">
          <h1 className="text-2xl font-extrabold text-[#062B56]">Լսելու արդյունք</h1>
          <p className="text-5xl font-bold text-[#FD7035] mt-3">
            {score}/{exercises.length}
          </p>
        </Card>
        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            setIndex(0);
            setScore(0);
            setDone(false);
            setSelected(null);
            setChecked(false);
            setReplays(0);
          }}
        >
          Կրկին սկսել
        </Button>
      </div>
    );
  }

  const maxReplays = ex.maxReplays ?? 3;

  return (
    <div className="px-5 pt-6 pb-8 space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold text-[#062B56]">Լսել</h1>
        <p className="text-[#062B56]/60 mt-1">
          Վարժություն {index + 1} / {exercises.length}
        </p>
      </div>

      <Card variant="blue" className="text-center py-6">
        <p className="text-lg font-bold text-[#062B56] mb-4">Écoutez attentivement</p>
        <p className="text-sm text-[#062B56]/60 mb-4">Ուշադիր լսե՛ք</p>
        <AudioPlayer
          text={ex.audioText}
          label={replays >= maxReplays ? "Լսումներն սպառված են" : "Լսել"}
          rate={0.85}
        />
        <button
          type="button"
          className="text-xs text-[#062B56]/45 mt-3"
          onClick={() => setReplays((r) => Math.min(maxReplays, r + 1))}
        >
          Լսումներ՝ {replays}/{maxReplays}
        </button>
      </Card>

      <Card className="space-y-4">
        <p className="font-semibold text-[#062B56] text-lg">{ex.questionHy}</p>
        <div className="space-y-2">
          {ex.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              disabled={checked}
              onClick={() => setSelected(opt)}
              className={`w-full text-left px-4 py-3 rounded-2xl border transition-all ${
                selected === opt
                  ? "border-[#FD7035] bg-[#FD7035]/15"
                  : "border-[#062B56]/10 bg-[#FAFAFA]"
              } ${
                checked && opt === ex.correctAnswer
                  ? "border-[#062B56] bg-[#C7E0E7]"
                  : checked && selected === opt
                    ? "border-[#FD7035] bg-[#FD7035]/15"
                    : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {!checked ? (
          <Button
            className="w-full"
            disabled={!selected}
            onClick={() => {
              const ok = selected === ex.correctAnswer;
              setChecked(true);
              if (ok) {
                setScore((s) => s + 1);
                addXp(8);
                updateSkill("listening", 2);
              }
            }}
          >
            Ստուգել
          </Button>
        ) : (
          <div className="space-y-3">
            <div
              className={`rounded-2xl p-4 ${
                selected === ex.correctAnswer ? "bg-[#C7E0E7]" : "bg-[#FD7035]/15"
              }`}
            >
              <p className="font-bold text-[#062B56]">
                {selected === ex.correctAnswer ? "✓ Ճիշտ է" : "✕ Սխալ է"}
              </p>
              <p className="text-sm text-[#062B56]/70 mt-1">{ex.explanationHy}</p>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (index + 1 >= exercises.length) setDone(true);
                else {
                  setIndex((i) => i + 1);
                  setSelected(null);
                  setChecked(false);
                  setReplays(0);
                }
              }}
            >
              Հաջորդ
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
