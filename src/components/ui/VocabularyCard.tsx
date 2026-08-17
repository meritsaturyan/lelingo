"use client";

import type { VocabItem, WordStatus } from "@/lib/types";
import { Card } from "./Card";
import { AudioIconButton } from "./AudioPlayer";
import { cn } from "@/lib/utils";

export function VocabularyCard({
  item,
  status,
  onStatusChange,
}: {
  item: VocabItem;
  status?: WordStatus;
  onStatusChange?: (status: WordStatus) => void;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-[#062B56]">{item.french}</h3>
          <p className="text-[#062B56]/70 mt-1">{item.armenian}</p>
        </div>
        <AudioIconButton text={item.french} />
      </div>

      <div className="rounded-2xl bg-[#FAFAFA] p-3">
        <p className="text-sm font-medium text-[#062B56]">{item.exampleFr}</p>
        <p className="text-sm text-[#062B56]/60 mt-1">{item.exampleHy}</p>
      </div>

      {onStatusChange && (
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["learned", "Սովորած"],
              ["difficult", "Դժվար"],
              ["favorite", "Սիրելի"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onStatusChange(key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                status === key
                  ? "bg-[#FD7035] text-white"
                  : "bg-[#C7E0E7]/60 text-[#062B56]"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
