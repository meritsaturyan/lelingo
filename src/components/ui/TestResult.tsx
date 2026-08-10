import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function TestResult({
  title,
  score,
  xp,
  details,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  score: number;
  xp?: number;
  details?: { label: string; value: string }[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const message =
    score >= 85
      ? "Շատ լավ արդյունք 🎉"
      : score >= 60
        ? "Լավ է, շարունակի՛ր՛"
        : "Պարապի՛ր և նորից փորձի՛ր";

  return (
    <div className="space-y-5 animate-in">
      <Card variant="blue" className="text-center py-8">
        <p className="text-sm font-medium text-[#062B56]/60">{title}</p>
        <h2 className="text-3xl font-bold text-[#062B56] mt-2">{message}</h2>
        <p className="text-5xl font-bold text-[#FD7035] mt-4">{score}%</p>
        {xp !== undefined && (
          <p className="text-[#062B56]/70 mt-3">
            Այս շաբաթ դու հավաքեցիր <strong>{xp} XP</strong>
          </p>
        )}
      </Card>

      {details && details.length > 0 && (
        <Card>
          <div className="space-y-3">
            {details.map((d) => (
              <div key={d.label} className="flex justify-between items-center">
                <span className="text-[#062B56]/65">{d.label}</span>
                <span className="font-semibold text-[#062B56]">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-3">
        <Link href={primaryHref}>
          <Button className="w-full" size="lg">
            {primaryLabel}
          </Button>
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref}>
            <Button className="w-full" size="lg" variant="soft">
              {secondaryLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
