"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sideTabs = [
  { href: "/dashboard", label: "Գլխավոր", icon: "/glxavor.jpg" },
  { href: "/listen", label: "Լսել", icon: "/lsel.jpg" },
] as const;

const centerTab = {
  href: "/learn",
  label: "Սովորել",
} as const;

const rightTabs = [
  { href: "/speak", label: "Խոսել", icon: "/xosel.jpg" },
  { href: "/progress", label: "Առաջընթաց", icon: "/arajyntac.jpg" },
] as const;

function SideTab({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-1 flex-col items-center justify-end gap-0.5 py-1 min-w-0 transition-colors",
        active ? "text-[#062B56]" : "text-[#8A94A6]"
      )}
    >
      <span
        className={cn(
          "h-7 w-7 rounded-full overflow-hidden",
          !active && "opacity-75 grayscale-[0.35]"
        )}
      >
        <Image
          src={icon}
          alt=""
          width={28}
          height={28}
          className="h-full w-full object-cover"
        />
      </span>
      <span
        className={cn(
          "text-[10px] truncate max-w-full",
          active ? "font-bold text-[#062B56]" : "font-medium"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const learnActive = isActive(centerTab.href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="relative mx-auto max-w-lg">
        <Link
          href={centerTab.href}
          className="absolute left-1/2 z-10 flex -translate-x-1/2 -top-[30px] flex-col items-center"
          aria-current={learnActive ? "page" : undefined}
        >
          <span
            className={cn(
              "flex h-[60px] w-[60px] items-center justify-center rounded-full p-[2.5px] shadow-[0_4px_18px_rgba(6,43,86,0.14)] transition-transform",
              "bg-[linear-gradient(135deg,#7C5CFF_0%,#E85D9A_50%,#FD7035_100%)]",
              learnActive && "scale-105 shadow-[0_6px_22px_rgba(253,112,53,0.28)]"
            )}
          >
            <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/sovorel.jpg"
                alt=""
                width={54}
                height={54}
                className="h-full w-full object-cover"
              />
            </span>
          </span>
        </Link>

        <div className="border-t border-[#062B56]/8 bg-[#F7F8FA] px-1 pb-2 pt-2.5">
          <div className="flex items-end justify-between">
            {sideTabs.map((tab) => (
              <SideTab key={tab.href} {...tab} active={isActive(tab.href)} />
            ))}

            <Link
              href={centerTab.href}
              className="flex flex-1 flex-col items-center justify-end pb-1 pt-9"
            >
              <span
                className={cn(
                  "text-[10px] font-bold",
                  learnActive ? "text-[#062B56]" : "text-[#8A94A6]"
                )}
              >
                {centerTab.label}
              </span>
            </Link>

            {rightTabs.map((tab) => (
              <SideTab key={tab.href} {...tab} active={isActive(tab.href)} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
