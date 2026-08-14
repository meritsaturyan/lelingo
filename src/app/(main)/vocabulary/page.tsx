"use client";

import Link from "next/link";
import Image from "next/image";
import { VOCAB_CATEGORIES, VOCABULARY } from "@/data/vocabulary";
import { useProgress } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";

export default function VocabularyPage() {
  const { progress } = useProgress();
  const level = (progress.level || "A1") as Level;
  const levelOrder: Level[] = ["A1", "A2", "B1", "B2"];
  const allowed = levelOrder.slice(0, levelOrder.indexOf(level) + 1);

  return (
    <div className="px-5 pt-5 pb-4 space-y-5">
      <AppHeader />
      <div>
        <h1 className="text-3xl font-extrabold text-[#062B56]">Բառապաշար</h1>
        <p className="text-[#062B56]/60 mt-1">
          Կատեգորիաներ ըստ թեմաների · մինչև {level}
        </p>
      </div>

      <Link href="/quiz">
        <Card variant="blue" className="!p-0 overflow-hidden mb-2">
          <div className="flex items-center gap-3">
            <div className="h-20 w-24 relative shrink-0">
              <Image src="/snund.jpg" alt="Quiz" fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-[#062B56]">Quiz</p>
              <p className="text-sm text-[#062B56]/60">Նկար → ֆրանսերեն բառ</p>
            </div>
          </div>
        </Card>
      </Link>

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
              <Card className="mb-3 !p-0 overflow-hidden hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="h-20 w-20 relative shrink-0">
                    <Image
                      src={cat.image}
                      alt={cat.nameHy}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pr-4 py-3">
                    <p className="font-bold text-[#062B56]">{cat.nameHy}</p>
                    <p className="text-sm text-[#062B56]/50 truncate">
                      {cat.description} · {words.length} բառ
                    </p>
                    <ProgressBar value={pct} className="mt-2" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
