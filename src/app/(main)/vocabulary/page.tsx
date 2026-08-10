"use client";

import Link from "next/link";
import { VOCAB_CATEGORIES, VOCABULARY } from "@/data/vocabulary";
import { useProgress } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Level } from "@/lib/types";

export default function VocabularyPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const levelOrder: Level[] = ["A1", "A2", "B1", "B2"];
  const allowed = levelOrder.slice(0, levelOrder.indexOf(level) + 1);

  return (
    <div className="px-5 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold text-[#062B56]">Բառապաշար</h1>
        <p className="text-[#062B56]/60 mt-1">
          Կատեգորիաներ ըստ թեմաների · մինչև {level}
        </p>
      </div>

      <div className="space-y-3">
        {VOCAB_CATEGORIES.map((cat) => {
          const words = VOCABULARY.filter(
            (v) => v.category === cat.id && allowed.includes(v.level)
          );
          if (!words.length) return null;
          const learned = words.filter(
            (w) => progress.vocabStatus[w.id] === "learned"
          ).length;
          const pct = Math.round((learned / words.length) * 100);

          return (
            <Link key={cat.id} href={`/vocabulary/${cat.id}`}>
              <Card className="mb-3 hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#C7E0E7] flex items-center justify-center text-2xl">
                    {cat.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#062B56]">{cat.nameHy}</p>
                    <p className="text-sm text-[#062B56]/50 truncate">
                      {cat.description} · {words.length} բառ
                    </p>
                    <ProgressBar value={pct} className="mt-2" />
                  </div>
                  <span className="text-[#062B56]/40">→</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
