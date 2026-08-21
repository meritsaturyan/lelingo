"use client";

import Image from "next/image";
import { speakFrench, stopSpeaking } from "@/lib/tts";
import { useState } from "react";
import { Button } from "./Button";

const LISTEN_ICON = "/listen-icon.png";

export function AudioPlayer({
  text,
  label = "Լսել",
  rate = 0.9,
  className,
  iconSrc = LISTEN_ICON,
  onPlayingChange,
}: {
  text: string;
  label?: string;
  rate?: number;
  className?: string;
  iconSrc?: string;
  onPlayingChange?: (playing: boolean) => void;
}) {
  const [playing, setPlaying] = useState(false);

  const setPlay = (v: boolean) => {
    setPlaying(v);
    onPlayingChange?.(v);
  };

  const play = async () => {
    setPlay(true);
    try {
      await speakFrench(text, rate);
    } finally {
      setPlay(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={className}
      onClick={() => {
        if (playing) {
          stopSpeaking();
          setPlay(false);
        } else {
          void play();
        }
      }}
      aria-label={label}
    >
      <Image
        src={playing ? LISTEN_ICON : iconSrc}
        alt=""
        width={22}
        height={22}
        className={`h-[22px] w-[22px] object-contain ${playing ? "animate-soft-pulse" : ""}`}
      />
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
      <Image
        src={LISTEN_ICON}
        alt=""
        width={24}
        height={24}
        className={`h-6 w-6 object-contain ${playing ? "animate-soft-pulse" : ""}`}
      />
    </button>
  );
}
