"use client";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useProgress } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { progress, hydrated, touchActivity } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!progress.onboardingComplete || !progress.level) {
      router.replace("/onboarding");
    } else {
      touchActivity();
    }
  }, [hydrated, progress.onboardingComplete, progress.level, router, touchActivity]);

  if (!hydrated || !progress.onboardingComplete) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-[#062B56]/50">Բեռնվում է…</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh pb-28">
      {children}
      <BottomNavigation />
    </div>
  );
}
