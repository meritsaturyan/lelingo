"use client";

import { useEffect, useRef } from "react";
import type { Level } from "@/lib/types";

const LEVEL_ORDER: Level[] = ["A1", "A2", "B1", "B2"];

const VIDEOS: { src: string; unlockAt: Level; label: string }[] = [
  { src: "/level1.MOV", unlockAt: "A2", label: "A1 → A2" },
  { src: "/level2.MOV", unlockAt: "B1", label: "A2 → B1" },
  { src: "/level3.MOV", unlockAt: "B2", label: "B1 → B2" },
];

function levelIndex(level: Level | null | undefined) {
  if (!level) return 0;
  return Math.max(0, LEVEL_ORDER.indexOf(level));
}

function LevelVideo({
  src,
  shouldPlay,
  label,
}: {
  src: string;
  shouldPlay: boolean;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const freezeFirstFrame = () => {
      try {
        el.pause();
        el.currentTime = 0.001;
      } catch {
        /* ignore seek errors before metadata */
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

    if (el.readyState >= 1) onLoaded();
    else el.addEventListener("loadedmetadata", onLoaded, { once: true });

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.pause();
    };
  }, [shouldPlay, src]);

  return (
    <div className="rounded-[24px] overflow-hidden bg-[#062B56]/5 shadow-[0_8px_30px_rgba(6,43,86,0.06)]">
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        preload="auto"
        className="w-full h-auto block"
        aria-label={label}
      />
    </div>
  );
}

/** Shows level1–3 videos: frozen on first ms until that stage is unlocked, then plays on visit. */
export function LevelProgressVideos({ level }: { level: Level }) {
  const idx = levelIndex(level);

  return (
    <div className="space-y-3 animate-fade-up">
      <h2 className="text-xl font-extrabold text-[#062B56]">Մակարդակի ուղի</h2>
      {VIDEOS.map((v) => {
        const unlockIdx = LEVEL_ORDER.indexOf(v.unlockAt);
        // Show current + next stage only (don't reveal later videos early)
        if (unlockIdx > idx + 1) return null;
        const shouldPlay = idx >= unlockIdx;
        return (
          <LevelVideo
            key={v.src}
            src={v.src}
            shouldPlay={shouldPlay}
            label={v.label}
          />
        );
      })}
    </div>
  );
}
