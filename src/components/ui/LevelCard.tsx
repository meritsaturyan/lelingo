"use client";

import type { LevelInfo } from "@/lib/types";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

export function LevelCard({
  level,
  selected,
  onSelect,
}: {
  level: LevelInfo;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className="w-full text-left">
      <Card
        className={cn(
          "border-2 transition-all duration-200",
          selected
            ? "border-[#FD7035] shadow-[0_8px_30px_rgba(253,112,53,0.2)]"
            : "border-transparent hover:border-[#C7E0E7]"
        )}
        style={{ background: level.color }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-[#062B56]">{level.id}</span>
              <span className="text-xs bg-white/70 px-2.5 py-1 rounded-full text-[#062B56] font-medium">
                {level.difficultyLabel}
              </span>
            </div>
            <p className="font-semibold text-[#062B56]">{level.titleHy}</p>
            <p className="text-sm text-[#062B56]/65 mt-1">{level.titleFr}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#062B56]/50">Դժվարություն</p>
            <div className="flex gap-1 mt-1 justify-end">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    n <= level.difficulty ? "bg-[#FD7035]" : "bg-white/70"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-[#062B56]/70 mt-3 leading-relaxed">
          {level.description}
        </p>
      </Card>
    </button>
  );
}
