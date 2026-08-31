"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store";
import { getDayLesson } from "@/data/weekly";
import { AudioIconButton } from "@/components/ui/AudioPlayer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GrammarExercise } from "@/components/exercises/GrammarExercise";
import { AlphabetLesson } from "@/components/exercises/AlphabetLesson";
import { ReadingLesson } from "@/components/exercises/ReadingLesson";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";
import { useRouter } from "next/navigation";
import { playCompleteSound } from "@/lib/sounds";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";
import { NumberBlitzGame } from "@/components/exercises/NumberBlitzGame";

export default function DayLessonPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = use(params);
  const { progress, addXp, markDayComplete, updateSkill } = useProgress();
  const level = (progress.level || "A1") as Level;
  const lesson = getDayLesson(level, day);
  const [exIndex, setExIndex] = useState(0);
  const [phase, setPhase] = useState<"learn" | "practice" | "minigame" | "done">(
    "learn"
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [blitzScore, setBlitzScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!lesson) return;
    if (lesson.type === "grammar" && lesson.grammarId) {
      router.replace(`/grammar/${lesson.grammarId}?lesson=${lesson.id || day}`);
    } else if (lesson.type === "weekly-test") {
      router.replace(`/weekly-test?lesson=${lesson.id || day}`);
    }
  }, [lesson, router, day]);

  if (!lesson) {
    return (
      <div className="px-5 py-10">
        <p>Դասը չի գտնվել։</p>
        <Link href="/learn">Վերադառնալ</Link>
      </div>
    );
  }

  if (lesson.type === "alphabet") {
    return <AlphabetLesson mode="alphabet" lessonId={lesson.id || day} />;
  }
  if (lesson.type === "combinations") {
    return <AlphabetLesson mode="combinations" lessonId={lesson.id || day} />;
  }
  if (lesson.type === "reading") {
    return (
      <ReadingLesson
        lessonId={lesson.id || day}
        readingId={lesson.readingId}
      />
    );
  }

  if (lesson.type === "grammar" || lesson.type === "weekly-test") {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-[#062B56]/50">Բեռնվում է…</p>
      </div>
    );
  }

  const exercises = lesson.exercises || [];
  const currentEx = exercises[exIndex];
  const completeKey = lesson.id || lesson.day;
  const hasNumberBlitz = completeKey === "w4-num2";

  const finish = (extraBlitz = 0) => {
    markDayComplete(completeKey);
    addXp(25 + correctCount * 5 + extraBlitz * 3);
    updateSkill("vocabulary", 3);
    playCompleteSound();
    setPhase("done");
  };

  const goAfterPractice = () => {
    if (hasNumberBlitz) setPhase("minigame");
    else finish();
  };

  if (phase === "done") {
    return (
      <div className="relative px-5 py-10 space-y-5">
        <ConfettiBurst active />
        <Card variant="blue" className="text-center py-8">
          <h1 className="text-2xl font-extrabold text-[#062B56]">Դասն ավարտված է</h1>
          <p className="text-[#062B56]/70 mt-2">
            Ճիշտ պատասխաններ՝ {correctCount}/{exercises.length || 0}
          </p>
          {hasNumberBlitz && (
            <p className="text-[#062B56]/70 mt-1">
              Մինի խաղ՝ {blitzScore}/5
            </p>
          )}
          <p className="text-[#FD7035] font-bold mt-2">
            +{25 + correctCount * 5 + blitzScore * 3} XP
          </p>
        </Card>
        <Link href="/learn">
          <Button className="w-full" size="lg">
            Վերադառնալ ամիս
          </Button>
        </Link>
      </div>
    );
  }

  if (phase === "minigame") {
    return (
      <div className="px-5 pt-5 pb-8 space-y-5">
        <AppHeader />
        <Link href="/learn" className="text-sm text-[#062B56]/50">
          ← Վերադառնալ
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-[#062B56]">Մինի խաղ</h1>
          <p className="text-[#062B56]/60 mt-1">
            10 վայրկյան · ընտրե՛ք կամ գրե՛ք թիվը
          </p>
        </div>
        <NumberBlitzGame
          onDone={(s) => {
            setBlitzScore(s);
            finish(s);
          }}
        />
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <Link href="/learn" className="text-sm text-[#062B56]/50">
        ← Վերադառնալ
      </Link>
      <div>
        <p className="text-sm font-medium text-[#062B56]/50">
          {lesson.dayLabelHy} · {lesson.dayLabelFr}
        </p>
        <h1 className="text-2xl font-extrabold text-[#062B56] mt-1">
          {lesson.themeHy}
        </h1>
        <p className="text-[#062B56]/60 mt-1">{lesson.themeFr}</p>
      </div>

      {phase === "learn" && (
        <>
          <div className="space-y-3">
            {lesson.expressions?.map((expr) => (
              <Card key={expr.french} variant="blue">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#062B56]">{expr.french}</h3>
                    <p className="text-[#062B56]/70 mt-1">({expr.armenian})</p>
                  </div>
                  <AudioIconButton text={expr.french} />
                </div>
                {expr.exampleFr && (
                  <div className="mt-3 rounded-2xl bg-white/70 p-3">
                    <p className="text-sm font-medium text-[#062B56]">
                      Exemple: {expr.exampleFr}
                    </p>
                    <p className="text-sm text-[#062B56]/60 mt-1">
                      ({expr.exampleHy})
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {lesson.rule && (
            <Card variant="accent">
              <p className="text-sm font-semibold text-[#062B56]/60 mb-1">
                La règle
              </p>
              <p className="text-[#062B56] leading-relaxed whitespace-pre-line">
                {lesson.rule}
              </p>
            </Card>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              if (!exercises.length) {
                if (hasNumberBlitz) setPhase("minigame");
                else finish();
              } else setPhase("practice");
            }}
          >
            {exercises.length ? "Անցնել վարժություններին" : "Ավարտել"}
          </Button>
        </>
      )}

      {phase === "practice" && currentEx && (
        <div className="space-y-4">
          <p className="text-sm text-[#062B56]/50">
            Վարժություն {exIndex + 1} / {exercises.length}
          </p>
          <GrammarExercise
            key={currentEx.id}
            exercise={currentEx}
            onComplete={(ok) => {
              if (ok) setCorrectCount((c) => c + 1);
              if (exIndex + 1 >= exercises.length) goAfterPractice();
              else setExIndex((i) => i + 1);
            }}
          />
        </div>
      )}
    </div>
  );
}
