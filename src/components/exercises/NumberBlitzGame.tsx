"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { normalizeFrench } from "@/lib/utils";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";

type Round =
  | {
      kind: "digits-to-fr";
      digits: string;
      french: string;
      options: string[];
    }
  | {
      kind: "fr-to-digits";
      french: string;
      digits: string;
    };

const ROUNDS: Round[] = [
  {
    kind: "digits-to-fr",
    digits: "1918",
    french: "mille neuf cent dix-huit",
    options: [
      "mille neuf cent dix-huit",
      "mille neuf cent dix-sept",
      "neuf cent dix-huit",
      "mille neuf cent quatre-vingts",
    ],
  },
  {
    kind: "fr-to-digits",
    french: "trente et un",
    digits: "31",
  },
  {
    kind: "digits-to-fr",
    digits: "70",
    french: "soixante-dix",
    options: ["soixante-dix", "septante", "quatre-vingts", "soixante"],
  },
  {
    kind: "fr-to-digits",
    french: "quatre-vingts",
    digits: "80",
  },
  {
    kind: "digits-to-fr",
    digits: "91",
    french: "quatre-vingt-onze",
    options: [
      "quatre-vingt-onze",
      "quatre-vingt-dix",
      "soixante-et-onze",
      "quatre-vingt-un",
    ],
  },
];

const SECONDS = 10;

export function NumberBlitzGame({ onDone }: { onDone: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [answer, setAnswer] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);

  const round = ROUNDS[index];
  const options = useMemo(() => {
    if (round.kind !== "digits-to-fr") return [];
    return [...round.options].sort(() => Math.random() - 0.5);
  }, [round]);

  useEffect(() => {
    setLeft(SECONDS);
    setAnswer("");
    setPicked(null);
    setLocked(false);
    setFeedback(null);
    const id = setInterval(() => {
      setLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [index]);

  useEffect(() => {
    if (left === 0 && !locked) {
      resolve(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const advance = (nextScore: number) => {
    if (index + 1 >= ROUNDS.length) {
      onDone(nextScore);
      return;
    }
    setIndex((i) => i + 1);
  };

  const resolve = (ok: boolean) => {
    if (locked) return;
    setLocked(true);
    setFeedback(ok ? "ok" : "bad");
    if (ok) playCorrectSound();
    else playWrongSound();
    const nextScore = ok ? score + 1 : score;
    if (ok) setScore(nextScore);
    setTimeout(() => advance(nextScore), 900);
  };

  const checkMc = (opt: string) => {
    if (locked || round.kind !== "digits-to-fr") return;
    setPicked(opt);
    resolve(normalizeFrench(opt) === normalizeFrench(round.french));
  };

  const checkWrite = () => {
    if (locked || round.kind !== "fr-to-digits") return;
    const cleaned = answer.replace(/\s+/g, "").replace(/[^\d]/g, "");
    resolve(cleaned === round.digits);
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#062B56]/50">
            Մինի խաղ · {index + 1}/{ROUNDS.length}
          </p>
          <h3 className="text-xl font-extrabold text-[#062B56]">10 վայրկյան</h3>
        </div>
        <div
          className={`h-14 w-14 rounded-full flex items-center justify-center text-xl font-extrabold ${
            left <= 3 ? "bg-[#FD7035]/20 text-[#FD7035]" : "bg-[#C7E0E7] text-[#062B56]"
          }`}
        >
          {left}
        </div>
      </div>

      <div className="h-2 rounded-full bg-[#062B56]/10 overflow-hidden">
        <div
          className="h-full bg-[#FD7035] transition-all duration-1000 linear"
          style={{ width: `${(left / SECONDS) * 100}%` }}
        />
      </div>

      {round.kind === "digits-to-fr" ? (
        <div className="space-y-3">
          <p className="text-sm text-[#062B56]/60">Ինչպե՞ս է սա ֆրանսերենով։</p>
          <p className="text-5xl font-extrabold text-[#062B56] text-center tracking-wide">
            {round.digits}
          </p>
          <div className="space-y-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                disabled={locked}
                onClick={() => checkMc(opt)}
                className={`w-full text-left px-4 py-3 rounded-2xl border transition-all ${
                  picked === opt
                    ? feedback === "ok"
                      ? "border-[#062B56] bg-[#C7E0E7]"
                      : "border-[#FD7035] bg-[#FD7035]/15"
                    : "border-[#062B56]/10 bg-[#FAFAFA]"
                }`}
              >
                <span className="font-semibold text-[#062B56]">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-[#062B56]/60">
            Լսե՛ք և գրե՛ք թիվը (օր. 31)
          </p>
          <AudioPlayer text={round.french} label="Լսել թիվը" rate={0.85} />
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={locked}
            inputMode="numeric"
            placeholder="Օրինակ՝ 80"
            className="w-full h-12 px-4 rounded-2xl border border-[#062B56]/10 bg-[#FAFAFA] text-[#062B56] outline-none focus:border-[#C7E0E7]"
          />
          <Button
            className="w-full"
            disabled={locked || !answer.trim()}
            onClick={checkWrite}
          >
            Ստուգել
          </Button>
        </div>
      )}

      {feedback === "ok" && (
        <p className="text-center font-bold text-[#062B56]">✓ Ճիշտ է</p>
      )}
      {feedback === "bad" && (
        <p className="text-center font-bold text-[#FD7035]">
          Նորի՛ց փորձիր
          {round.kind === "digits-to-fr"
            ? ` · ${round.french}`
            : ` · ${round.digits}`}
        </p>
      )}
    </Card>
  );
}
