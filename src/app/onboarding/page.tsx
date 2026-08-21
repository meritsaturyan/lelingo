"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LevelCard } from "@/components/ui/LevelCard";
import { LEVELS } from "@/data/levels";
import type { LearningGoal, Level } from "@/lib/types";
import { useProgress } from "@/lib/store";

const features = [
  { label: "Բառապաշար" },
  { label: "Քերականություն" },
  { label: "Լսել" },
  { label: "Թելադրություն" },
  { label: "Խոսել" },
  { label: "Շաբաթական թեստեր" },
  { label: "Ամենօրյա պարապմունք" },
  { label: "Առաջընթացի հետևում" },
];

const GOALS: { id: LearningGoal; titleHy: string; desc: string }[] = [
  { id: "travel", titleHy: "Ճանապարհորդություն", desc: "Ճանապարհորդել, հյուրանոց, տրանսպորտ" },
  { id: "business", titleHy: "Բիզնես", desc: "Աշխատանքային հանդիպումներ և նամակներ" },
  { id: "study", titleHy: "Ուսում", desc: "Ուսում կամ քննություններ" },
  { id: "culture", titleHy: "Մշակույթ", desc: "Ֆիլմեր, երաժշտություն, գրքեր" },
  { id: "relocation", titleHy: "Տեղափոխություն", desc: "Ապրել ֆրանսախոս երկրում" },
  { id: "other", titleHy: "Այլ", desc: "Անձնական հետաքրքրություն" },
];

const AVATARS = [
  { id: "girl", src: "/girl.png", labelHy: "Աղջիկ" },
  { id: "boy", src: "/boy.png", labelHy: "Տղա" },
] as const;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<LearningGoal | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selected, setSelected] = useState<Level | null>(null);
  const { completeOnboarding, updateProfile } = useProgress();
  const router = useRouter();

  if (step === 0) {
    return (
      <div className="min-h-dvh flex flex-col bg-[#C7E0E7]">
        <div className="relative flex-1 overflow-hidden flex flex-col items-center justify-center px-6 pt-12 pb-10">
          <span className="star-deco top-10 left-10 animate-soft-pulse" />
          <span className="star-deco top-20 right-14 animate-soft-pulse" style={{ animationDelay: "0.5s" }} />
          <span className="star-deco bottom-24 left-1/4 animate-soft-pulse" style={{ animationDelay: "1s" }} />

          <div className="animate-float relative w-full max-w-[280px]">
            <Image
              src="/logo.png"
              alt="Le Lingo"
              width={560}
              height={280}
              className="w-full h-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
          <h1 className="text-3xl font-extrabold text-[#062B56] text-center mt-8 animate-fade-up leading-tight">
            Բարի գալուստ
            <br />
            ֆրանսերենի աշխարհ
          </h1>
        </div>

        <div className="px-6 py-8 relative z-10">
          <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(6,43,86,0.08)] p-6 animate-fade-up">
            <p className="text-[#062B56]/70 leading-relaxed text-center mb-5">
              Le Lingo-ն օգնում է հայերեն խոսողներին սովորել ֆրանսերեն՝ բառապաշարի,
              քերականության, լսելու, թելադրության, խոսելու և շաբաթական թեստերի միջոցով։
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 rounded-2xl bg-[#C7E0E7]/40 px-3 py-2.5"
                >
                  <span className="text-sm font-medium text-[#062B56]">{f.label}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" size="lg" onClick={() => setStep(1)}>
              Սկսել
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-dvh px-5 py-8 pb-10 bg-[#C7E0E7]/30">
        <div className="mb-4">
          <Image src="/logo2.png" alt="Le Lingo" width={120} height={40} className="h-9 w-auto" />
        </div>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="text-[#062B56]/50 mb-4 text-sm"
        >
          ← Վերադառնալ
        </button>
        <h1 className="text-3xl font-extrabold text-[#062B56]">
          Ի՞նչ նպատակով եք սովորում
        </h1>
        <p className="text-[#062B56]/60 mt-2 mb-6">
          Սա կօգնի հարմարեցնել ձեր ուղին։
        </p>

        <div className="space-y-3 mb-6">
          {GOALS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGoal(g.id)}
              className={`w-full text-left rounded-[24px] p-4 border transition-all ${
                goal === g.id
                  ? "border-[#FD7035] bg-[#FD7035]/10"
                  : "border-[#062B56]/10 bg-white"
              }`}
            >
              <p className="font-bold text-[#062B56]">{g.titleHy}</p>
              <p className="text-sm text-[#062B56]/60 mt-1">{g.desc}</p>
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!goal}
          onClick={() => setStep(2)}
        >
          Շարունակել
        </Button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-dvh px-5 py-8 pb-10 bg-[#C7E0E7]/30">
        <div className="mb-4">
          <Image src="/logo2.png" alt="Le Lingo" width={120} height={40} className="h-9 w-auto" />
        </div>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-[#062B56]/50 mb-4 text-sm"
        >
          ← Վերադառնալ
        </button>
        <h1 className="text-3xl font-extrabold text-[#062B56]">
          Ընտրե՛ք ավատարը
        </h1>
        <p className="text-[#062B56]/60 mt-2 mb-6">
          Աղջիկ կամ տղա — հետո կարող եք փոխել կարգավորումներում։
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {AVATARS.map((a) => {
            const active = avatar === a.src;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setAvatar(a.src)}
                className={`rounded-[28px] p-4 border-2 transition-all ${
                  active
                    ? "border-[#FD7035] bg-[#FD7035]/10"
                    : "border-[#062B56]/10 bg-white"
                }`}
              >
                <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden bg-[#C7E0E7] shadow-sm">
                  <Image
                    src={a.src}
                    alt={a.labelHy}
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                </div>
                <p className="mt-3 text-center font-bold text-[#062B56] text-lg">
                  {a.labelHy}
                </p>
              </button>
            );
          })}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!avatar}
          onClick={() => setStep(3)}
        >
          Շարունակել
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-5 py-8 pb-10 bg-[#C7E0E7]/30">
      <div className="mb-4">
        <Image src="/logo2.png" alt="Le Lingo" width={120} height={40} className="h-9 w-auto" />
      </div>
      <button
        type="button"
        onClick={() => setStep(2)}
        className="text-[#062B56]/50 mb-4 text-sm"
      >
        ← Վերադառնալ
      </button>
      <h1 className="text-3xl font-extrabold text-[#062B56] animate-fade-up">
        Ընտրե՛ք մակարդակը
      </h1>
      <p className="text-[#062B56]/60 mt-2 mb-6 animate-fade-up">
        A1-ը մոտ 5–6 շաբաթ է։
      </p>

      <div className="space-y-3 mb-6">
        {LEVELS.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            selected={selected === level.id}
            onSelect={() => setSelected(level.id)}
          />
        ))}
      </div>

      <div className="space-y-3 sticky bottom-4">
        <Button
          className="w-full"
          size="lg"
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            completeOnboarding(selected, undefined, goal, avatar);
            router.push("/dashboard");
          }}
        >
          Շարունակել {selected ? `(${selected})` : ""}
        </Button>
        <Button
          className="w-full"
          size="lg"
          variant="soft"
          onClick={() => {
            if (avatar) updateProfile({ avatarUrl: avatar });
            router.push("/placement");
          }}
        >
          Որոշել իմ մակարդակը
        </Button>
      </div>
    </div>
  );
}
