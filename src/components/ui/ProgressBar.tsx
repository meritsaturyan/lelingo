import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  color = "orange",
  height = "sm",
}: {
  value: number;
  className?: string;
  color?: "orange" | "navy" | "blue";
  height?: "sm" | "md";
}) {
  const colors = {
    orange: "bg-[#FD7035]",
    navy: "bg-[#062B56]",
    blue: "bg-[#C7E0E7]",
  };
  return (
    <div
      className={cn(
        "w-full rounded-full bg-[#062B56]/10 overflow-hidden",
        height === "sm" ? "h-1.5" : "h-2.5",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", colors[color])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  size = 88,
  stroke = 8,
  label,
  color = "#FD7035",
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, value) / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#062B561A"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[#062B56] font-bold text-lg">{Math.round(value)}%</span>
        {label && <span className="text-[10px] text-[#062B56]/60">{label}</span>}
      </div>
    </div>
  );
}
