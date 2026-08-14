import Image from "next/image";
import { Card } from "./Card";
import { motivationalMessage } from "@/lib/utils";
import { streakImage } from "@/components/layout/AppHeader";

export function StreakCard({ streak }: { streak: number }) {
  const img = streakImage(Math.max(1, streak));

  return (
    <Card variant="accent" className="relative overflow-hidden">
      <div className="relative flex items-center gap-4">
        <div className="h-20 w-20 rounded-2xl overflow-hidden bg-white shadow-sm shrink-0">
          <Image
            src={img}
            alt="Streak"
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#062B56]/70">Անընդմեջ սովորում</p>
          <p className="text-2xl font-bold text-[#062B56] mt-1">
            {streak} օր անընդմեջ
          </p>
          <p className="text-sm text-[#062B56]/75 mt-2 leading-relaxed">
            {motivationalMessage(streak)}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function WeeklyCalendar({
  completedDays,
}: {
  completedDays: string[];
}) {
  const labels = ["Երկ", "Երք", "Չոր", "Հին", "Ուր", "Շաբ", "Կիր"];
  const today = new Date();
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() - dayIndex);

  return (
    <Card variant="blue">
      <p className="text-sm font-semibold text-[#062B56]/70 mb-4">Այս շաբաթ</p>
      <div className="grid grid-cols-7 gap-1.5">
        {labels.map((label, i) => {
          const d = new Date(monday);
          d.setDate(monday.getDate() + i);
          const key = d.toISOString().slice(0, 10);
          const done = completedDays.includes(key);
          const isToday = i === dayIndex;
          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-[#062B56]/50 font-medium">{label}</span>
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isToday
                    ? "bg-[#062B56] text-white"
                    : done
                      ? "bg-[#FD7035] text-white"
                      : "bg-white/70 text-[#062B56]/40"
                }`}
              >
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
