"use client";

import Image from "next/image";
import { speakFrench, stopSpeaking } from "@/lib/tts";
import { useState } from "react";
import { Button } from "./Button";

export function AudioPlayer({
  text,
  label = "Լսել",
  rate = 0.9,
  className,
  iconSrc,
}: {
  text: string;
  label?: string;
  rate?: number;
  className?: string;
  iconSrc?: string;
}) {
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    setPlaying(true);
    await speakFrench(text, rate);
    setPlaying(false);
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={className}
      onClick={() => (playing ? stopSpeaking() : play())}
      aria-label={label}
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] rounded-full object-cover"
        />
      ) : (
        <span className="text-base">{playing ? "⏹" : "🔊"}</span>
      )}
      <span>{playing ? "Կանգնեցնել" : label}</span>
    </Button>
  );
}

export function AudioIconButton({
  text,
  rate = 0.9,
}: {
  text: string;
  rate?: number;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        setPlaying(true);
        await speakFrench(text, rate);
        setPlaying(false);
      }}
      className="h-10 w-10 rounded-full bg-white/80 text-[#062B56] flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
      aria-label="Լսել"
    >
      {playing ? "⏹" : "🔊"}
    </button>
  );
}
