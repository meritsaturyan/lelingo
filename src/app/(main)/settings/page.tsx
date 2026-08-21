"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LEVELS } from "@/data/levels";
import { LevelCard } from "@/components/ui/LevelCard";
import { useProgress } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppHeader } from "@/components/layout/AppHeader";
import type { Level } from "@/lib/types";

export default function SettingsPage() {
  const { progress, setLevel, resetAll, updateProfile, hydrated } = useProgress();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

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

  const onAvatar = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatarUrl: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const initial = (firstName || "Ա").slice(0, 1).toUpperCase();

  return (
    <div className="px-5 pt-5 pb-8 space-y-5">
      <AppHeader />
      <Link href="/dashboard" className="text-sm text-[#062B56]/50">
        ← Գլխավոր
      </Link>
      <h1 className="text-3xl font-extrabold text-[#062B56]">Կարգավորումներ</h1>

      <Card className="space-y-4">
        <p className="text-sm text-[#062B56]/50">Պրոֆիլ</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="h-20 w-20 rounded-full bg-[#C7E0E7] overflow-hidden flex items-center justify-center shrink-0 shadow-sm"
            aria-label="Փոխել ավատարը"
          >
            {progress.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={progress.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-[#062B56]">{initial}</span>
            )}
          </button>
          <div className="space-y-1">
            <Button
              type="button"
              size="sm"
              variant="soft"
              onClick={() => fileRef.current?.click()}
            >
              Ընտրել լուսանկար
            </Button>
            {progress.avatarUrl && (
              <button
                type="button"
                className="block text-xs text-[#FD7035]"
                onClick={() => updateProfile({ avatarUrl: null })}
              >
                Հեռացնել
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onAvatar(e.target.files?.[0] || null)}
          />
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
