"use client";

import { CroissantCharacter } from "@/components/CroissantCharacter";

/**
 * Speak UI wrapper — layered croissant with blink + lip-sync while TTS plays.
 */
export function SpeakingCroissant({
  isSpeaking,
  size = 140,
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
      className={className}
    />
  );
}
