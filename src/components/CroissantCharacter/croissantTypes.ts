export type EyeState = "open" | "half" | "closed";

export type MouthState = "smile" | "small" | "wide" | "round" | "wide1";

export type CroissantEmotion = "idle" | "talking" | "happy" | "surprised";

/** Blink timing (ms) — edit here to tune blink speed */
export const BLINK_TIMING = {
  openToHalf: 100,
  halfToClosed: 100,
  closedHold: 120,
  closedToHalf: 100,
  halfToOpen: 100,
  /** Random idle gap between blinks */
  gapMin: 3000,
  gapMax: 6000,
} as const;

/** Lip-sync frame duration (ms) — edit here to tune talk speed */
export const TALK_TIMING = {
  frameMs: 140,
} as const;

export const TALK_MOUTH_CYCLE: MouthState[] = [
  "small",
  "wide1",
  "wide",
  "round",
  "small",
];

export const DEMO_TALK_CYCLE: MouthState[] = [
  "smile",
  "small",
  "wide1",
  "wide",
  "round",
  "small",
  "smile",
];

export const EYE_SRC: Record<EyeState, string> = {
  open: "/croissant/eyes-open.png",
  half: "/croissant/eyes-half.png",
  closed: "/croissant/eyes-closed.png",
};

export const MOUTH_SRC: Record<MouthState, string> = {
  smile: "/croissant/mouth-smile.png",
  small: "/croissant/mouth-small.png",
  wide: "/croissant/mouth-wide.png",
  round: "/croissant/mouth-round.png",
  wide1: "/croissant/mouth-wide1.png",
};

export const BODY_SRC = "/croissant/body.png";
export const EYEBROWS_SRC = "/croissant/eyebrows.png";

export const ALL_LAYER_SRCS = [
  BODY_SRC,
  EYEBROWS_SRC,
  ...Object.values(EYE_SRC),
  ...Object.values(MOUTH_SRC),
] as const;
