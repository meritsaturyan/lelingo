"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/store";

export default function HomePage() {
  const { progress, hydrated } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (progress.onboardingComplete && progress.level) {
      router.replace("/dashboard");
    } else {
      router.replace("/onboarding");
    }
  }, [hydrated, progress.onboardingComplete, progress.level, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#C7E0E7]">
      <div className="text-center animate-fade-up">
        <div className="text-5xl font-extrabold text-[#062B56] tracking-tight">
          Le Lingo
        </div>
        <p className="text-[#062B56]/60 mt-2">Բեռնվում է…</p>
      </div>
    </div>
  );
}
