"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard", label: "Գլխավոր", icon: "🏠" },
  { href: "/learn", label: "Սովորել", icon: "📚" },
  { href: "/listen", label: "Լսել", icon: "🎧" },
  { href: "/speak", label: "Խոսել", icon: "🎤" },
  { href: "/progress", label: "Առաջընթաց", icon: "📊" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-lg">
        <div className="bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_-4px_30px_rgba(6,43,86,0.1)] border border-[#062B56]/8 px-2 py-2 flex items-center justify-around">
          {tabs.map((tab) => {
            const active =
              pathname === tab.href || pathname.startsWith(tab.href + "/");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all min-w-[56px]",
                  active
                    ? "bg-[#C7E0E7] text-[#062B56]"
                    : "text-[#062B56]/45 hover:text-[#062B56]"
                )}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
