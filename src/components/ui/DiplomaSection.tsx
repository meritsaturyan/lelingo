"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function DiplomaSection({
  unlocked,
  className,
}: {
  unlocked: boolean;
  className?: string;
}) {
  return (
    <section className={cn("space-y-6 pt-2", className)}>
      <div>
        <h2 className="text-xl font-extrabold text-[#062B56]">
          Մակարդակի վկայական
        </h2>
        <p className="text-[#062B56]/65 mt-2 leading-relaxed">
          Երբ ավարտեք առաջին շաբաթների դասերը, կստանաք մակարդակի վկայական։
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-[#062B56]">Դիպլոմ</h2>
          {!unlocked ? (
            <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-[#FD7035]/15">
              <Image
                src="/lock-icon.png"
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 object-contain opacity-80"
              />
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#C7E0E7] text-[#062B56]">
              Բաց է
            </span>
          )}
        </div>
        <p className="text-[#062B56]/65 mt-2 leading-relaxed">
          Ուսումն ավարտելուց հետո կստանաք մանկավարժական ամփոփում՝ մակարդակի,
          առաջընթացի և մասնակցության վիճակագրությամբ։
        </p>

        {unlocked && (
          <div className="mt-4 rounded-[24px] bg-gradient-to-br from-[#C7E0E7] to-[#FAFAFA] border border-[#062B56]/10 p-5 text-center space-y-2">
            <p className="text-sm font-semibold text-[#062B56]/50 tracking-wide uppercase">
              Le Lingo
            </p>
            <p className="text-2xl font-extrabold text-[#062B56]">A1 Դիպլոմ</p>
            <p className="text-[#062B56]/70 text-sm">
              Շնորհավորում ենք․ դուք ավարտել եք A1 ծրագիրը։
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
