"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Level } from "@/lib/types";
import mapPath from "@/data/map-path.json";
import "./LearningMap.css";

const STORAGE_KEY = "lelingo-map-a2-anim";

function pointsToPath(points: number[][]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");
}

export function LearningMap({ level }: { level: Level }) {
  const [showAnim, setShowAnim] = useState(false);
  const d = useMemo(() => pointsToPath(mapPath.points as number[][]), []);

  useEffect(() => {
    const isA2Plus = level === "A2" || level === "B1" || level === "B2";
    setShowAnim(isA2Plus);
    if (isA2Plus && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, level);
      } catch {
        /* ignore */
      }
    }
  }, [level]);

  return (
    <div className="relative -mx-1 w-[calc(100%+0.5rem)]">
      <Image
        src="/qartez.png"
        alt="Քարտեզ"
        width={1461}
        height={1077}
        priority
        className="relative z-0 h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(6,43,86,0.18)]"
        sizes="(max-width: 640px) 100vw, 560px"
      />

      {showAnim && (
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD27A" />
              <stop offset="50%" stopColor="#FD7035" />
              <stop offset="100%" stopColor="#FFE6A3" />
            </linearGradient>
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={d}
            fill="none"
            stroke="url(#goldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#goldGlow)"
            className="map-path-pulse"
          />

          <path
            d={d}
            fill="none"
            stroke="#FFE08A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#goldGlow)"
            className="map-path-draw"
          />

          <circle r="1.6" fill="#FFF6D0" filter="url(#goldGlow)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={d} />
          </circle>
          <circle r="0.7" fill="#FFFFFF">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={d} />
          </circle>
        </svg>
      )}
    </div>
  );
}
