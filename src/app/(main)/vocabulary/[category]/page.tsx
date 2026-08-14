"use client";

import { use } from "react";
import Link from "next/link";
import { VOCAB_CATEGORIES, VOCABULARY } from "@/data/vocabulary";
import { VocabularyCard } from "@/components/ui/VocabularyCard";
import { useProgress } from "@/lib/store";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";

export default function VocabCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const cat = VOCAB_CATEGORIES.find((c) => c.id === category);
  const { progress, setVocabStatus, addXp } = useProgress();
  const level = (progress.level || "A1") as Level;
  const levelOrder: Level[] = ["A1", "A2", "B1", "B2"];
  const allowed = levelOrder.slice(0, levelOrder.indexOf(level) + 1);

  const words = VOCABULARY.filter(
    (v) => v.category === category && allowed.includes(v.level)
  );

  if (!cat) {
    return (
      <div className="px-5 py-10">
        <p>Կատեգորիան չի գտնվել։</p>
        <Link href="/vocabulary">Վերադառնալ</Link>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 space-y-4">
      <AppHeader />
      <Link href="/vocabulary" className="text-sm text-[#062B56]/50">
        ← Բառապաշար
      </Link>
      <div>
        <h1 className="text-3xl font-extrabold text-[#062B56]">
          {cat.nameHy}
        </h1>
        <p className="text-[#062B56]/60">{words.length} բառ</p>
      </div>

      {words.map((item) => (
        <VocabularyCard
          key={item.id}
          item={item}
          status={progress.vocabStatus[item.id]}
          onStatusChange={(status) => {
            const wasLearned = progress.vocabStatus[item.id] === "learned";
            setVocabStatus(item.id, status);
            if (status === "learned" && !wasLearned) addXp(3);
          }}
        />
      ))}
    </div>
  );
}
