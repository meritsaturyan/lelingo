"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Level } from "@/lib/types";
import {
  isSpeechRecognitionSupported,
  startListeningFrench,
  stopSpeaking,
  type ListenController,
} from "@/lib/tts";
import { normalizeFrench } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { AppHeader } from "@/components/layout/AppHeader";
import { READING_TEXTS } from "@/data/alphabet";
import { useProgress } from "@/lib/store";

export function ReadingLesson({
  lessonId,
  readingId,
}: {
  lessonId: string;
  readingId?: string;
}) {
  const { progress, markDayComplete, addXp, updateSkill } = useProgress();
  const level = (progress.level || "A1") as Level;
  const texts = READING_TEXTS.filter((t) => t.level === level || t.level === "A1");
  const text = texts.find((t) => t.id === readingId) || texts[0];

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<
    { said: string; expected: string; ok: boolean }[] | null
  >(null);
  const [done, setDone] = useState(false);
  const controllerRef = useRef<ListenController | null>(null);

  useEffect(() => {
    return () => {
      controllerRef.current?.stop();
    };
  }, []);

  if (!text) {
    return (
      <div className="px-5 py-10">
        <p>Տեքստ չկա։</p>
        <Link href="/learn">Վերադառնալ</Link>
      </div>
    );
  }

  const evaluate = (spoken: string) => {
    const words = text.french
      .replace(/[.,!?;:]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    const saidNorm = normalizeFrench(spoken);
    const rows = words.map((w) => {
      const nw = normalizeFrench(w);
      const ok = saidNorm.includes(nw) || nw.length <= 2;
      return { said: spoken ? "…" : "", expected: w, ok };
    });
    const missing = text.keywords.filter((k) => !saidNorm.includes(normalizeFrench(k)));
    setFeedback(
      missing.length
        ? missing.map((k) => ({
            said: "(չի լսվել)",
            expected: k,
            ok: false,
          }))
        : [{ said: spoken.slice(0, 80), expected: "Լավ արտասանություն", ok: true }]
    );
    return missing.length === 0;
  };

  const toggle = () => {
    if (listening) {
      controllerRef.current?.stop();
      controllerRef.current = null;
      setListening(false);
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      setFeedback([
        {
          said: "(միկրոֆոնը հասանելի չէ)",
          expected: "Կարդացե՛ք բարձրաձայն կամ լսե՛ք օրինակը",
          ok: false,
        },
      ]);
      return;
    }
    stopSpeaking();
    setFeedback(null);
    setListening(true);
    controllerRef.current = startListeningFrench(
      (t) => setTranscript(t),
      () => setListening(false),
      (on) => setListening(on)
    );
  };

  const finish = () => {
    markDayComplete(lessonId);
    addXp(25);
    updateSkill("speaking", 3);
    setDone(true);
  };

  if (done) {
    return (
      <div className="px-5 pt-5 pb-8 space-y-5">
        <AppHeader />
        <Card variant="blue" className="text-center py-8">
          <h1 className="text-2xl font-extrabold text-[#062B56]">Վերջ</h1>
          <p className="text-[#062B56]/70 mt-2">Ընթերցանության դասն ավարտված է</p>
        </Card>
        <Link href="/learn">
          <Button className="w-full" size="lg">
            Վերադառնալ ամիս
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
        <p className="text-sm text-[#062B56]/50">Ընթերցանություն</p>
        <h1 className="text-2xl font-extrabold text-[#062B56]">{text.titleHy}</h1>
      </div>

      <Card variant="blue" className="space-y-3">
        <p className="text-xl font-bold text-[#062B56] leading-relaxed">{text.french}</p>
        <p className="text-[#062B56]/65">{text.armenian}</p>
        <AudioPlayer text={text.french} label="Լսել օրինակը" />
      </Card>

      <Card className="space-y-3">
        <p className="font-semibold text-[#062B56]">Կարդացե՛ք բարձրաձայն</p>
        <Button
          variant={listening ? "navy" : "primary"}
          className="w-full"
          onClick={toggle}
        >
          {listening ? "Կանգնեցնել" : "Սկսել ընթերցումը"}
        </Button>
        {transcript && (
          <p className="text-sm text-[#062B56]/70 bg-[#FAFAFA] rounded-2xl p-3">
            Դուք ասացիք՝ {transcript}
          </p>
        )}
        <Button
          variant="secondary"
          className="w-full"
          disabled={!transcript.trim()}
          onClick={() => evaluate(transcript)}
        >
          Ստուգել արտասանությունը
        </Button>
      </Card>

      {feedback && (
        <Card className={feedback.every((f) => f.ok) ? "bg-[#C7E0E7]" : ""}>
          <p className="font-bold text-[#062B56] mb-2">
            {feedback.every((f) => f.ok) ? "✓ Լավ է" : "Ուղղումներ"}
          </p>
          {feedback.map((f, i) => (
            <p key={i} className="text-sm text-[#062B56] mt-1">
              {f.ok ? (
                f.expected
              ) : (
                <>
                  Բացակայում է / սխալ՝ <strong>{f.expected}</strong>
                </>
              )}
            </p>
          ))}
        </Card>
      )}

      <Button className="w-full" size="lg" onClick={finish}>
        Ավարտել դասը
      </Button>
    </div>
  );
}
