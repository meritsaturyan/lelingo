"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { compareDictation } from "@/lib/utils";

export function DictationExercise({
  text,
  hint,
  onComplete,
}: {
  text: string;
  hint?: string;
  onComplete?: (score: number) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<ReturnType<typeof compareDictation> | null>(
    null
  );

  const submit = () => {
    const r = compareDictation(text, answer);
    setResult(r);
    onComplete?.(r.score);
  };

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-medium text-[#062B56]/60 mb-1">Թելադրություն</p>
        <h3 className="text-xl font-bold text-[#062B56]">Լսե՛ք և գրե՛ք</h3>
        {hint && <p className="text-sm text-[#062B56]/50 mt-1">{hint}</p>}
      </div>

      <AudioPlayer text={text} label="Լսել նախադասությունը" rate={0.85} />

      <textarea
        value={answer}
        disabled={!!result}
        onChange={(e) => setAnswer(e.target.value)}
        rows={3}
        placeholder="Գրե՛ք այն, ինչ լսում եք…"
        className="w-full px-4 py-3 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] text-[#062B56] outline-none focus:border-[#C7E0E7] resize-none"
      />

      {!result ? (
        <Button onClick={submit} className="w-full" disabled={!answer.trim()}>
          Ստուգել
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="rounded-2xl bg-[#C7E0E7]/40 p-4">
            <p className="text-3xl font-bold text-[#062B56]">
              {result.score} / 10
            </p>
            <p className="text-sm text-[#062B56]/70 mt-1">
              {result.mistakes.length === 0
                ? "Կատարյալ՛"
                : `${result.mistakes.length} սխալ`}
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAFAFA] p-4 space-y-2">
            <p className="text-sm">
              <span className="text-[#062B56]/50">Ճիշտ պատասխան՝ </span>
              <span className="font-semibold text-[#062B56]">{text}</span>
            </p>
            <p className="text-sm">
              <span className="text-[#062B56]/50">Ձեր պատասխանը՝ </span>
              <span className="font-semibold text-[#062B56]">{answer}</span>
            </p>
          </div>

          {result.mistakes.length > 0 && (
            <div className="rounded-2xl bg-[#FD7035]/15 p-4 space-y-2">
              <p className="font-semibold text-[#FD7035]">Սխալներ</p>
              {result.mistakes.map((m, i) => (
                <p key={i} className="text-sm text-[#062B56]">
                  «{m.actual}» → <strong>{m.expected}</strong>
                </p>
              ))}
              {result.accentOnly && (
                <p className="text-sm text-[#062B56]/70 mt-2">
                  Ուշադրություն՝ շեշտանիշները (accents) կարևոր են ֆրանսերենում։
                  Բառերը ճիշտ էին, բայց accents-ը բացակայում էին։
                </p>
              )}
              {!result.accentOnly && (
                <p className="text-sm text-[#062B56]/70 mt-2">
                  Ուշադիր լսե՛ք և համեմատե՛ք ուղղագրությունը ճիշտ պատասխանի հետ։
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
