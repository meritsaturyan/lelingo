"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LEVELS } from "@/data/levels";
import { LevelCard } from "@/components/ui/LevelCard";
import { useProgress } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";

const AVATARS = [
  { id: "girl", src: "/girl.png", labelHy: "Աղջիկ" },
  { id: "boy", src: "/boy.png", labelHy: "Տղա" },
] as const;

export default function SettingsPage() {
  const { progress, setLevel, resetAll, updateProfile, hydrated } = useProgress();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    setFirstName(progress.firstName || progress.name.split(/\s+/)[0] || "");
    setLastName(
      progress.lastName || progress.name.split(/\s+/).slice(1).join(" ") || ""
    );
  }, [hydrated, progress.firstName, progress.lastName, progress.name]);

  const saveName = () => {
    updateProfile({ firstName: firstName.trim(), lastName: lastName.trim() });
  };

  const selectedAvatar = progress.avatarUrl;

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <Link href="/dashboard" className="text-sm text-[#062B56]/50">
        ← Գլխավոր
      </Link>
      <h1 className="text-3xl font-extrabold text-[#062B56]">Կարգավորումներ</h1>

      <Card className="space-y-4">
        <p className="text-sm text-[#062B56]/50">Պրոֆիլ</p>

        <div>
          <p className="text-sm font-semibold text-[#062B56] mb-3">
            Ընտրե՛ք ավատարը
          </p>
          <div className="grid grid-cols-2 gap-3">
            {AVATARS.map((a) => {
              const active = selectedAvatar === a.src;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => updateProfile({ avatarUrl: a.src })}
                  className={`rounded-[24px] p-3 border-2 transition-all ${
                    active
                      ? "border-[#FD7035] bg-[#FD7035]/10"
                      : "border-[#062B56]/10 bg-[#FAFAFA]"
                  }`}
                >
                  <div className="relative mx-auto h-28 w-28 rounded-full overflow-hidden bg-[#C7E0E7] shadow-sm">
                    <Image
                      src={a.src}
                      alt={a.labelHy}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <p className="mt-2 text-center font-bold text-[#062B56]">
                    {a.labelHy}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#062B56]/60">Անուն</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={saveName}
            className="w-full h-12 px-4 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] text-[#062B56] outline-none focus:border-[#C7E0E7]"
            placeholder="Անուն"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-[#062B56]/60">Ազգանուն</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={saveName}
            className="w-full h-12 px-4 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] text-[#062B56] outline-none focus:border-[#C7E0E7]"
            placeholder="Ազգանուն"
          />
        </div>
        <p className="text-[#062B56]/60 text-sm">
          Ընթացիկ մակարդակ՝ <strong>{progress.level}</strong>
        </p>
      </Card>

      <div>
        <h2 className="font-bold text-[#062B56] mb-3">Փոխել մակարդակը</h2>
        <p className="text-sm text-[#062B56]/60 mb-3">
          Դուք միշտ կարող եք փոխել մակարդակը։ Առաջընթացը կպահպանվի։
        </p>
        <div className="space-y-3">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              selected={progress.level === level.id}
              onSelect={() => setLevel(level.id as Level)}
            />
          ))}
        </div>
      </div>

      <Link href="/placement">
        <Button variant="secondary" className="w-full" size="lg">
          Կրկին անցնել տեղադրման թեստը
        </Button>
      </Link>

      <Button
        variant="ghost"
        className="w-full text-[#FD7035]"
        onClick={() => {
          if (confirm("Վերակայե՞լ ամբողջ առաջընթացը։")) {
            resetAll();
            window.location.href = "/onboarding";
          }
        }}
      >
        Վերակայել առաջընթացը
      </Button>
    </div>
  );
}
