"use client";

import { CroissantCharacter } from "@/components/CroissantCharacter";

/**
 * Speak UI wrapper — layered croissant with blink + lip-sync while TTS plays.
 * PNGs have large transparent padding; zoom crops that without shifting layers.
 */
export function SpeakingCroissant({
  isSpeaking,
  size = 170,
  className = "",
}: {
  isSpeaking: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <CroissantCharacter
      autoBlink
      autoTalk={isSpeaking}
      size={size}
      zoom={2.2}
      className={className}
    />
  );
}
