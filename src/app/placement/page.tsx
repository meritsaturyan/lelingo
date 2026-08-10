"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PLACEMENT_QUESTIONS, scorePlacement } from "@/data/placement";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { useProgress } from "@/lib/store";
import { LEVELS } from "@/data/levels";
import type { Level } from "@/lib/types";

export default function PlacementPage() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [pickOther, setPickOther] = useState(false);
  const { recordPlacement, setLevel, completeOnboarding } = useProgress();
  const router = useRouter();

  const q = PLACEMENT_QUESTIONS[index];
  const result = useMemo(
    () => (done ? scorePlacement(answers) : null),
    [done, answers]
  );

  const submitCurrent = (value: string) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setInput("");
    if (index + 1 >= PLACEMENT_QUESTIONS.length) {
      const scored = scorePlacement(next);
      recordPlacement({
        level: scored.level,
        strengths: scored.strengths,
        weaknesses: scored.weaknesses,
        score: scored.score,
      });
      setDone(true);
    } else {
      setIndex(index + 1);
    }
  };

  if (done && result && !pickOther) {
    return (
      <div className="min-h-dvh px-5 py-8 pb-10">
        <Card variant="blue" className="text-center py-8 mb-5 animate-fade-up">
          <p className="text-sm text-[#062B56]/60">Տեղադրման թեստ</p>
          <h1 className="text-3xl font-extrabold text-[#062B56] mt-2">
            Ձեր մակարդակը՝ {result.level}
          </h1>
          <p className="text-4xl font-bold text-[#FD7035] mt-4">{result.score}%</p>
        </Card>

        <Card className="mb-4 space-y-3 animate-fade-up">
          <div>
            <p className="text-sm text-[#062B56]/50 mb-1">Ուժեղ կողմեր</p>
            <div className="flex flex-wrap gap-2">
              {result.strengths.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-[#C7E0E7] text-sm font-medium text-[#062B56]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-[#062B56]/50 mb-1">Թույլ կողմեր</p>
            <div className="flex flex-wrap gap-2">
              {result.weaknesses.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-[#FD7035]/15 text-sm font-medium text-[#062B56]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-[#062B56]/50 mb-1">Առաջարկվող ուղի</p>
            <p className="text-[#062B56] font-medium">
              Սկսե՛ք {result.level} մակարդակից և ամեն շաբաթ անցե՛ք բառապաշար →
              քերականություն → խոսակցություն → շաբաթվա թեստ։
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              completeOnboarding(result.level);
              router.push("/dashboard");
            }}
          >
            Սկսել {result.level} մակարդակից
          </Button>
          <Button
            className="w-full"
            size="lg"
            variant="soft"
            onClick={() => setPickOther(true)}
          >
            Ընտրել այլ մակարդակ
          </Button>
        </div>
      </div>
    );
  }

  if (pickOther && result) {
    return (
      <div className="min-h-dvh px-5 py-8">
        <h1 className="text-2xl font-extrabold text-[#062B56] mb-4">
          Ընտրե՛ք մակարդակ
        </h1>
        <div className="space-y-3">
          {LEVELS.map((l) => (
            <Button
              key={l.id}
              variant={l.id === result.level ? "primary" : "soft"}
              className="w-full justify-between"
              size="lg"
              onClick={() => {
                setLevel(l.id as Level);
                completeOnboarding(l.id as Level);
                router.push("/dashboard");
              }}
            >
              <span>
                {l.id} — {l.titleHy}
              </span>
              <span>→</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const progressPct = ((index + 1) / PLACEMENT_QUESTIONS.length) * 100;

  return (
    <div className="min-h-dvh px-5 py-8 pb-10">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#062B56]/60 mb-2">
          <span>
            Հարց {index + 1} / {PLACEMENT_QUESTIONS.length}
          </span>
          <span>{q.level}</span>
        </div>
        <ProgressBar value={progressPct} />
      </div>

      <Card className="space-y-4 animate-fade-up" key={q.id}>
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#C7E0E7] text-[#062B56]">
          {q.skill === "vocabulary"
            ? "Բառապաշար"
            : q.skill === "grammar"
              ? "Քերականություն"
              : q.skill === "listening"
                ? "Լսել"
                : q.skill === "reading"
                  ? "Ընթերցանություն"
                  : "Թարգմանություն"}
        </span>
        <h2 className="text-xl font-bold text-[#062B56]">{q.questionHy}</h2>
        {q.promptFr && <p className="text-[#062B56]/60">{q.promptFr}</p>}
        {q.audioText && <AudioPlayer text={q.audioText} />}

        {q.options ? (
          <div className="space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => submitCurrent(opt)}
                className="w-full text-left px-4 py-3.5 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] hover:border-[#FD7035] hover:bg-[#FD7035]/15 transition-colors font-medium text-[#062B56]"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Գրե՛ք պատասխանը…"
              className="w-full h-12 px-4 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] outline-none focus:border-[#C7E0E7]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) submitCurrent(input.trim());
              }}
            />
            <Button
              className="w-full"
              disabled={!input.trim()}
              onClick={() => submitCurrent(input.trim())}
            >
              Հաջորդ
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
