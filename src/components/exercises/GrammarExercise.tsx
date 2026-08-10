"use client";

import { useMemo, useState } from "react";
import type { Exercise } from "@/lib/types";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { normalizeFrench } from "@/lib/utils";

export function GrammarExercise({
  exercise,
  onComplete,
}: {
  exercise: Exercise;
  onComplete?: (correct: boolean) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [order, setOrder] = useState<string[]>(exercise.words || []);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [leftPick, setLeftPick] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const check = () => {
    let ok = false;
    if (exercise.type === "multiple-choice" || exercise.type === "listen-choose" || exercise.type === "true-false") {
      ok = selected === exercise.correctAnswer;
    } else if (exercise.type === "fill-blank" || exercise.type === "translate" || exercise.type === "dictation") {
      const expected = Array.isArray(exercise.correctAnswer)
        ? exercise.correctAnswer[0]
        : exercise.correctAnswer;
      ok =
        normalizeFrench(answer) === normalizeFrench(expected) ||
        answer.trim().toLowerCase() === expected.trim().toLowerCase();
    } else if (exercise.type === "reorder") {
      const joined = order.join(" ");
      const expected = Array.isArray(exercise.correctAnswer)
        ? exercise.correctAnswer[0]
        : exercise.correctAnswer;
      ok =
        normalizeFrench(joined) === normalizeFrench(expected) ||
        normalizeFrench(joined.replace("Je habite", "J'habite")) ===
          normalizeFrench(expected);
    } else if (exercise.type === "match") {
      const pairs = exercise.pairs || [];
      ok = pairs.every((p) => matched[p.left] === p.right);
    }
    setIsCorrect(ok);
    setChecked(true);
    onComplete?.(ok);
  };

  const moveWord = (idx: number) => {
    if (checked) return;
    const next = [...order];
    if (idx < next.length - 1) {
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      setOrder(next);
    }
  };

  const shuffledRight = useMemo(() => {
    const rights = (exercise.pairs || []).map((p) => p.right);
    return [...rights].sort(() => Math.random() - 0.5);
  }, [exercise.pairs]);

  return (
    <Card className="space-y-4">
      <p className="font-semibold text-[#062B56] text-lg">{exercise.questionHy}</p>
      {exercise.promptFr && (
        <p className="text-[#062B56]/70 text-base">{exercise.promptFr}</p>
      )}
      {exercise.audioText && (
        <AudioPlayer text={exercise.audioText} label="Լսե՛ք ուշադիր" />
      )}

      {(exercise.type === "multiple-choice" ||
        exercise.type === "listen-choose" ||
        exercise.type === "true-false") && (
        <div className="space-y-2">
          {exercise.options?.map((opt) => (
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
                checked && opt === exercise.correctAnswer
                  ? "border-[#062B56] bg-[#C7E0E7]"
                  : checked && selected === opt && !isCorrect
                    ? "border-[#FD7035] bg-[#FD7035]/15"
                    : ""
              }`}
            >
              <span className="text-[#062B56] font-medium">{opt}</span>
            </button>
          ))}
        </div>
      )}

      {(exercise.type === "fill-blank" ||
        exercise.type === "translate" ||
        exercise.type === "dictation") && (
        <input
          value={answer}
          disabled={checked}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Գրե՛ք պատասխանը…"
          className="w-full h-12 px-4 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] text-[#062B56] outline-none focus:border-[#C7E0E7]"
        />
      )}

      {exercise.type === "reorder" && (
        <div className="flex flex-wrap gap-2">
          {order.map((w, i) => (
            <button
              key={`${w}-${i}`}
              type="button"
              onClick={() => moveWord(i)}
              className="px-3 py-2 rounded-xl bg-[#C7E0E7] text-[#062B56] font-medium"
            >
              {w}
            </button>
          ))}
          <p className="w-full text-xs text-[#062B56]/50 mt-1">
            Հպե՛ք բառին՝ հաջորդի հետ տեղափոխելու համար
          </p>
        </div>
      )}

      {exercise.type === "match" && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {exercise.pairs?.map((p) => (
              <button
                key={p.left}
                type="button"
                onClick={() => setLeftPick(p.left)}
                className={`w-full px-3 py-2 rounded-xl text-sm font-medium ${
                  leftPick === p.left
                    ? "bg-[#FD7035] text-white"
                    : matched[p.left]
                      ? "bg-[#C7E0E7] text-[#062B56]"
                      : "bg-[#C7E0E7]/60 text-[#062B56]"
                }`}
              >
                {p.left}
                {matched[p.left] ? ` → ${matched[p.left]}` : ""}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {shuffledRight.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  if (!leftPick) return;
                  setMatched((m) => ({ ...m, [leftPick]: r }));
                  setLeftPick(null);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAFA] border border-[#062B56]/10 text-sm text-[#062B56]"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {!checked ? (
        <Button onClick={check} className="w-full">
          Ստուգել
        </Button>
      ) : (
        <div
          className={`rounded-2xl p-4 ${
            isCorrect ? "bg-[#C7E0E7]" : "bg-[#FD7035]/15"
          }`}
        >
          <p className={`font-bold ${isCorrect ? "text-[#062B56]" : "text-[#FD7035]"}`}>
            {isCorrect ? "✓ Ճիշտ է" : "✕ Սխալ է"}
          </p>
          {!isCorrect && (
            <p className="text-sm text-[#062B56] mt-1">
              Ճիշտ պատասխան՝{" "}
              <strong>
                {Array.isArray(exercise.correctAnswer)
                  ? exercise.correctAnswer.join(", ")
                  : exercise.correctAnswer}
              </strong>
            </p>
          )}
          <p className="text-sm text-[#062B56]/70 mt-2">{exercise.explanationHy}</p>
        </div>
      )}
    </Card>
  );
}
