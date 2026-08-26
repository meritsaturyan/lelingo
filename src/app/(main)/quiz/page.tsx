"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { QUIZ_ITEMS } from "@/data/quiz";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { useProgress } from "@/lib/store";
import { playCorrectSound, playWrongSound, playCompleteSound } from "@/lib/sounds";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const items = useMemo(() => shuffle(QUIZ_ITEMS), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const { addXp, updateSkill } = useProgress();

  const item = items[index];
  const options = useMemo(
    () => (item ? shuffle(item.options) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item?.id]
  );

  if (done) {
    return (
      <div className="relative px-5 pt-5 pb-8 space-y-5">
        <ConfettiBurst active />
        <AppHeader />
        <Card variant="blue" className="text-center py-8">
          <h1 className="text-2xl font-extrabold text-[#062B56]">Quiz արդյունք</h1>
          <p className="text-5xl font-bold text-[#FD7035] mt-3">
            {score}/{items.length}
          </p>
        </Card>
        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            setIndex(0);
            setScore(0);
            setDone(false);
            setSelected(null);
            setChecked(false);
          }}
        >
          Կրկին սկսել
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <div>
        <h1 className="text-3xl font-extrabold text-[#062B56]">Quiz</h1>
        <p className="text-[#062B56]/60 mt-1">
          Ի՞նչ է սա ֆրանսերենով · {index + 1}/{items.length}
        </p>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="relative h-56 w-full bg-[#C7E0E7]">
          <Image
            src={item.image}
            alt={item.armenian}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="p-4 space-y-3">
          <p className="text-center text-[#062B56]/70 text-sm">{item.armenian}</p>
          <AudioPlayer text={item.french} label="Լսել ճիշտ բառը" />
        </div>
      </Card>

      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            disabled={checked}
            onClick={() => setSelected(opt)}
            className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all font-medium text-[#062B56] ${
              selected === opt
                ? "border-[#FD7035] bg-[#FD7035]/15"
                : "border-[#062B56]/10 bg-white"
            } ${
              checked && opt === item.french
                ? "border-[#062B56] bg-[#C7E0E7]"
                : checked && selected === opt
                  ? "border-[#FD7035] bg-[#FD7035]/15"
                  : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {!checked ? (
        <Button
          className="w-full"
          disabled={!selected}
          onClick={() => {
            const ok = selected === item.french;
            setChecked(true);
            if (ok) {
              setScore((s) => s + 1);
              addXp(5);
              updateSkill("vocabulary", 1);
              playCorrectSound();
            } else {
              playWrongSound();
            }
          }}
        >
          Ստուգել
        </Button>
      ) : (
        <div className="space-y-3">
          <Card variant={selected === item.french ? "blue" : "accent"}>
            <p className="font-bold text-[#062B56]">
              {selected === item.french ? "✓ Ճիշտ է" : "✕ Սխալ է"}
            </p>
            <p className="text-sm text-[#062B56]/70 mt-1">
              Ճիշտ պատասխան՝ <strong>{item.french}</strong> ({item.armenian})
            </p>
          </Card>
          <Button
            className="w-full"
            onClick={() => {
              if (index + 1 >= items.length) {
                playCompleteSound();
                setDone(true);
              } else {
                setIndex((i) => i + 1);
                setSelected(null);
                setChecked(false);
              }
            }}
          >
            Հաջորդ
          </Button>
        </div>
      )}
    </div>
  );
}
