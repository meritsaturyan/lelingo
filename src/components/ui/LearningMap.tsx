"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Level } from "@/lib/types";
import "./LearningMap.css";

/** Neon route from the provided SVG (viewBox 1000×750) */
const ROUTE_D =
  "M 240,580 L 285,575 C 350,560 410,580 490,590 C 580,600 680,560 740,600 C 760,610 740,625 730,600 M 490,590 C 440,530 400,500 390,470 L 390,420 C 420,330 500,240 560,220 C 610,230 650,235 655,235 L 730,220 C 740,240 745,260 725,290 C 690,340 630,370 635,390 C 640,410 675,450 675,465 M 730,220 L 810,200";

const NODES: { cx: number; cy: number; r: number }[] = [
  { cx: 240, cy: 580, r: 7 },
  { cx: 285, cy: 575, r: 7 },
  { cx: 490, cy: 590, r: 10 },
  { cx: 390, cy: 510, r: 7 },
  { cx: 390, cy: 420, r: 8 },
  { cx: 655, cy: 235, r: 7 },
  { cx: 730, cy: 220, r: 8 },
  { cx: 740, cy: 255, r: 7 },
  { cx: 635, cy: 390, r: 9 },
  { cx: 675, cy: 465, r: 7 },
  { cx: 810, cy: 200, r: 8 },
];

export function LearningMap({ level }: { level: Level }) {
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    setShowAnim(level === "A2" || level === "B1" || level === "B2");
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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 750"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <filter id="mapNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background line */}
          <path
            d={ROUTE_D}
            fill="none"
            stroke="#332200"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.3}
          />

          {/* Animated glowing route */}
          <path
            className="map-neon-glow"
            d={ROUTE_D}
            fill="none"
            stroke="#ffaa00"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#mapNeonGlow)"
            opacity={0.85}
          />
          <path
            className="map-neon-core"
            d={ROUTE_D}
            fill="none"
            stroke="#fff7d0"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#mapNeonGlow)"
          />

          {/* Glowing nodes */}
          {NODES.map((n, i) => (
            <circle
              key={i}
              className="map-neon-node"
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="#ffea88"
              filter="url(#mapNeonGlow)"
            />
          ))}
        </svg>
      )}
    </div>
  );
}
