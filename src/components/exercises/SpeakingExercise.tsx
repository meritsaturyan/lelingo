"use client";

import { useEffect, useRef, useState } from "react";
import type { SpeakingPrompt } from "@/lib/types";
import { startListeningFrench } from "@/lib/tts";
import { evaluateSpeaking } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

export function SpeakingExercise({
  prompt,
  onComplete,
}: {
  prompt: SpeakingPrompt;
  onComplete?: (score: number) => void;
}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof evaluateSpeaking> | null>(
    null
  );
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => stopRef.current?.();
  }, []);

  const start = () => {
    setResult(null);
    setTranscript("");
    setListening(true);
    const { stop, supported: ok } = startListeningFrench(
      (text) => {
        setTranscript(text);
        setListening(false);
      },
      (err) => {
        setListening(false);
        if (err === "unsupported") setSupported(false);
      }
    );
    stopRef.current = stop;
    if (!ok) {
      setSupported(false);
      setListening(false);
    }
  };

  const evaluate = (text: string) => {
    const r = evaluateSpeaking(text, prompt.expectedKeywords);
    setResult(r);
    onComplete?.(r.total);
  };

  return (
    <Card className="space-y-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-[#062B56]/50">
          {prompt.topicHy}
        </span>
        <h3 className="text-2xl font-bold text-[#062B56] mt-1">{prompt.promptFr}</h3>
        <p className="text-[#062B56]/65 mt-1">{prompt.promptHy}</p>
      </div>

      <AudioPlayer text={prompt.promptFr} label="Լսել հարցը" />

      <p className="text-sm text-[#062B56]/55 bg-[#FAFAFA] rounded-2xl p-3">
        💡 {prompt.tipsHy}
      </p>

      {!supported && (
        <div className="rounded-2xl bg-[#FD7035]/15 p-4 text-sm text-[#062B56]">
          Ձեր բրաուզերը չի աջակցում Speech-to-Text։ Կարող եք պատասխանը գրել ստորև։
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={listening ? () => stopRef.current?.() : start}
          variant={listening ? "navy" : "primary"}
          className="flex-1"
        >
          {listening ? "⏺ Լսում է…" : "🎤 Խոսել"}
        </Button>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={3}
        placeholder="Ձեր պատասխանը կհայտնվի այստեղ, կամ գրե՛ք ձեռքով…"
        className="w-full px-4 py-3 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] text-[#062B56] outline-none focus:border-[#C7E0E7] resize-none"
      />

      {!result && (
        <Button
          onClick={() => evaluate(transcript)}
          disabled={!transcript.trim()}
          className="w-full"
          variant="secondary"
        >
          Գնահատել
        </Button>
      )}

      {result && (
        <div className="space-y-3">
          <div className="rounded-2xl bg-[#C7E0E7]/50 p-4 text-center">
            <p className="text-sm text-[#062B56]/60">Speaking</p>
            <p className="text-4xl font-bold text-[#062B56]">{result.total} / 100</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Բառապաշար", result.vocabulary],
              ["Քերականություն", result.grammar],
              ["Սահունություն", result.fluency],
              ["Լրիվություն", result.completeness],
            ].map(([label, score]) => (
              <div key={label as string} className="rounded-2xl bg-[#FAFAFA] p-3 text-center">
                <p className="text-xs text-[#062B56]/50">{label}</p>
                <p className="font-bold text-[#062B56]">{score as number}/10</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#FAFAFA] p-4">
            <p className="text-sm text-[#062B56]/50">Դուք ասացիք՝</p>
            <p className="font-medium text-[#062B56]">{transcript}</p>
            <p className="text-sm text-[#062B56]/50 mt-3">Օրինակ պատասխան՝</p>
            <p className="font-medium text-[#062B56]">{prompt.sampleAnswer}</p>
          </div>

          {result.corrections.map((c, i) => (
            <div key={i} className="rounded-2xl bg-[#FD7035]/15 p-4">
              <p className="text-sm">
                <span className="text-[#062B56]/50">Ասացիք՝ </span>
                {c.said}
              </p>
              <p className="text-sm mt-1">
                <span className="text-[#062B56]/50">Ճիշտ՝ </span>
                <strong>{c.correct}</strong>
              </p>
              <p className="text-sm text-[#062B56]/70 mt-2">{c.explanationHy}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
