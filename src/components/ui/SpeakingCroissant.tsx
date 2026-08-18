"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IDLE = [1, 12] as const;
const TALK = [2, 3, 4, 5] as const;
const TRANSITION = [6, 7, 8] as const;
const BLINK = [9, 10] as const;

function frameSrc(n: number) {
  return `/croissant/slice-${n}.png`;
}

/**
 * Animated croissant character.
 * idle: 1 ↔ 12 · speaking: 2–5 · transitions: 6–8 · blink: 9→10
 */
export function SpeakingCroissant({
  isSpeaking,
  size = 120,
  className = "",
}: {
  isSpeaking: boolean;
  size?: number;
  className?: string;
}) {
  const [frame, setFrame] = useState(1);
  const speakingRef = useRef(isSpeaking);
  const queueRef = useRef<number[]>([]);
  const talkIdx = useRef(0);
  const idleIdx = useRef(0);
  const talkSteps = useRef(0);
  const nextBlink = useRef(0);

  useEffect(() => {
    speakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    nextBlink.current = Date.now() + 2000 + Math.random() * 2000;

    const id = setInterval(
      () => {
        const now = Date.now();

        if (queueRef.current.length > 0) {
          setFrame(queueRef.current.shift()!);
          return;
        }

        if (now >= nextBlink.current) {
          const resume = speakingRef.current
            ? TALK[talkIdx.current % TALK.length]
            : IDLE[idleIdx.current % IDLE.length];
          queueRef.current = [...BLINK, resume];
          nextBlink.current = now + 2800 + Math.random() * 2200;
          setFrame(queueRef.current.shift()!);
          return;
        }

        if (speakingRef.current) {
          talkSteps.current += 1;
          if (talkSteps.current >= 7) {
            talkSteps.current = 0;
            queueRef.current = [...TRANSITION];
            setFrame(queueRef.current.shift()!);
            return;
          }
          const n = TALK[talkIdx.current % TALK.length];
          talkIdx.current += 1;
          setFrame(n);
        } else {
          talkSteps.current = 0;
          const n = IDLE[idleIdx.current % IDLE.length];
          idleIdx.current += 1;
          setFrame(n);
        }
      },
      isSpeaking ? 130 : 650
    );

    return () => clearInterval(id);
  }, [isSpeaking]);

  return (
    <div
      className={`relative shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
        <Image
          key={n}
          src={frameSrc(n)}
          alt=""
          width={size}
          height={size}
          priority={n <= 2}
          className={`absolute inset-0 h-full w-full object-contain ${
            frame === n ? "opacity-100" : "opacity-0"
          }`}
          unoptimized
        />
      ))}
    </div>
  );
}
