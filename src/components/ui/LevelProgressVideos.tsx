"use client";

import { useEffect, useRef, useState } from "react";
import type { Level } from "@/lib/types";

const LEVEL_ORDER: Level[] = ["A1", "A2", "B1", "B2"];

/** One slot: level1 → then swaps to level2 → then level3 */
const STAGE: Record<
  Level,
  { playSrc: string | null; nextSrc: string; frozenOnly?: boolean }
> = {
  A1: { playSrc: null, nextSrc: "/level1.MOV", frozenOnly: true },
  A2: { playSrc: "/level1.MOV", nextSrc: "/level2.MOV" },
  B1: { playSrc: "/level2.MOV", nextSrc: "/level3.MOV" },
  B2: { playSrc: "/level3.MOV", nextSrc: "/level3.MOV" },
};

export function LevelProgressVideos({ level }: { level: Level }) {
  const stage = STAGE[level] || STAGE.A1;
  const [src, setSrc] = useState(
    stage.frozenOnly || !stage.playSrc ? stage.nextSrc : stage.playSrc
  );
  const [shouldPlay, setShouldPlay] = useState(
    Boolean(stage.playSrc) && !stage.frozenOnly
  );
  const ref = useRef<HTMLVideoElement>(null);

  // Reset when level changes
  useEffect(() => {
    const s = STAGE[level] || STAGE.A1;
    if (s.frozenOnly || !s.playSrc) {
      setSrc(s.nextSrc);
      setShouldPlay(false);
    } else {
      setSrc(s.playSrc);
      setShouldPlay(true);
    }
  }, [level]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const freezeFirstFrame = () => {
      try {
        el.pause();
        el.currentTime = 0.001;
      } catch {
        /* ignore */
      }
    };

    const onLoaded = () => {
      if (shouldPlay) {
        el.currentTime = 0;
        void el.play().catch(() => freezeFirstFrame());
      } else {
        freezeFirstFrame();
      }
    };

    const onEnded = () => {
      const s = STAGE[level] || STAGE.A1;
      // After celebration clip ends → show next level video frozen
      if (s.playSrc && s.nextSrc !== s.playSrc) {
        setSrc(s.nextSrc);
        setShouldPlay(false);
      } else {
        freezeFirstFrame();
      }
    };

    if (el.readyState >= 1) onLoaded();
    else el.addEventListener("loadedmetadata", onLoaded, { once: true });
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("ended", onEnded);
      el.pause();
    };
  }, [shouldPlay, src, level]);

  return (
    <div className="space-y-3 animate-fade-up">
      <h2 className="text-xl font-extrabold text-[#062B56]">Մակարդակի ուղի</h2>
      <div className="rounded-[24px] overflow-hidden bg-[#062B56]/5 shadow-[0_8px_30px_rgba(6,43,86,0.06)]">
        <video
          key={src}
          ref={ref}
          src={src}
          muted
          playsInline
          preload="auto"
          className="w-full h-auto block"
          aria-label={`Level video ${LEVEL_ORDER.indexOf(level) + 1}`}
        />
      </div>
    </div>
  );
}
