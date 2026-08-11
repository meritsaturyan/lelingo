"use client";

import { useEffect, useRef, useState } from "react";
import type { SpeakingPrompt } from "@/lib/types";
import {
  isMobileDevice,
  isSpeechRecognitionSupported,
  startListeningFrench,
  stopSpeaking,
  type ListenController,
} from "@/lib/tts";
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
  const [micError, setMicError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof evaluateSpeaking> | null>(
    null
  );
  const controllerRef = useRef<ListenController | null>(null);
  const startingRef = useRef(false);

  useEffect(() => {
    setSupported(isSpeechRecognitionSupported());
    setIsMobile(isMobileDevice());
    return () => {
      controllerRef.current?.stop();
      controllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    controllerRef.current?.stop();
    controllerRef.current = null;
    startingRef.current = false;
    setListening(false);
    setTranscript("");
    setResult(null);
    setMicError(null);
  }, [prompt.id]);

  const stop = () => {
    controllerRef.current?.stop();
    controllerRef.current = null;
    startingRef.current = false;
    setListening(false);
  };

  const start = () => {
    if (startingRef.current || listening) return;
    startingRef.current = true;

    setResult(null);
    setMicError(null);
    stopSpeaking();

    if (typeof window !== "undefined" && !window.isSecureContext) {
      setMicError(
        "Միկրոֆոնը աշխատում է միայն HTTPS կամ localhost միջավայրում։"
      );
      setSupported(false);
      startingRef.current = false;
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setSupported(false);
      setMicError(
        "Ձեր հեռախոսի բրաուզերը չի աջակցում խոսքի ճանաչում։ Գրե՛ք պատասխանը ստորև, կամ բացե՛ք Chrome-ով։"
      );
      startingRef.current = false;
      return;
    }

    // Do NOT call getUserMedia first on mobile — it locks the mic
    // and then SpeechRecognition freezes or immediately disconnects.
    controllerRef.current?.stop();
    setListening(true);

    const controller = startListeningFrench(
      (text) => setTranscript(text),
      (err) => {
        startingRef.current = false;
        setListening(false);
        if (err === "unsupported") {
          setSupported(false);
          setMicError(
            "Ձեր բրաուզերը չի աջակցում Speech-to-Text։ Գրե՛ք պատասխանը ստորև։"
          );
        } else if (err === "not-allowed") {
          setMicError(
            "Միկրոֆոնի թույլտվությունը մերժված է։ Թույլատրե՛ք միկրոֆոնը կայքի համար։"
          );
        } else if (err === "audio-capture") {
          setMicError(
            "Միկրոֆոնը հասանելի չէ։ Փակե՛ք այլ հավելվածները, որոնք օգտագործում են միկրոֆոնը։"
          );
        } else if (err === "mobile-failed" || err === "start-failed") {
          setMicError(
            "Խոսքի ճանաչումը չհաջողվեց։ Կրկին սեղմե՛ք կամ գրե՛ք պատասխանը։"
          );
        }
      },
      (isOn) => {
        setListening(isOn);
        if (!isOn) startingRef.current = false;
      }
    );

    controllerRef.current = controller;
    if (!controller.supported) {
      setSupported(false);
      setListening(false);
      startingRef.current = false;
    }
  };

  const toggle = () => {
    if (listening || startingRef.current) stop();
    else start();
  };

  const evaluate = (text: string) => {
    stop();
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
        {isMobile && (
          <>
            <br />
            Հեռախոսում՝ սեղմե՛ք «Խոսել», ասե՛ք մեկ նախադասություն, ապա սպասե՛ք։
          </>
        )}
      </p>

      {(!supported || micError) && (
        <div className="rounded-2xl bg-[#FD7035]/15 p-4 text-sm text-[#062B56]">
          {micError ||
            "Ձեր բրաուզերը չի աջակցում Speech-to-Text։ Կարող եք պատասխանը գրել ստորև։"}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={toggle}
          variant={listening ? "navy" : "primary"}
          className="flex-1 touch-manipulation"
          type="button"
        >
          {listening ? "⏹ Կանգնեցնել" : "🎤 Խոսել"}
        </Button>
      </div>

      {listening && (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#C7E0E7] py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FD7035] animate-soft-pulse" />
          <p className="text-sm font-semibold text-[#062B56]">
            {isMobile
              ? "Լսում է… ասե՛ք մեկ նախադասություն"
              : "Լսում է… խոսե՛ք ֆրանսերեն"}
          </p>
        </div>
      )}

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
          className="w-full touch-manipulation"
          variant="secondary"
          type="button"
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
              <div
                key={label as string}
                className="rounded-2xl bg-[#FAFAFA] p-3 text-center"
              >
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
