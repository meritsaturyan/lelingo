"use client";

import { useEffect, useState } from "react";

/** Soft deterrent against casual screenshots / screen capture on mobile web. */
export function ScreenshotGuard({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden") setHidden(true);
      else setTimeout(() => setHidden(false), 400);
    };
    const onBlur = () => setHidden(true);
    const onFocus = () => setHidden(false);
    const block = (e: Event) => e.preventDefault();

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("copy", block);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("copy", block);
    };
  }, []);

  return (
    <div className="relative min-h-full select-none">
      {children}
      {hidden && (
        <div className="fixed inset-0 z-[9999] bg-[#062B56] flex items-center justify-center px-8">
          <p className="text-white text-center text-lg font-bold">
            Բովանդակությունը պաշտպանված է
          </p>
        </div>
      )}
    </div>
  );
}
