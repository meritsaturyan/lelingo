/** Lightweight UI feedback sounds via Web Audio API (no asset files). */

let sharedCtx: AudioContext | null = null;

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx) sharedCtx = new AC();
  if (sharedCtx.state === "suspended") void sharedCtx.resume();
  return sharedCtx;
}

function tone(
  frequency: number,
  start: number,
  duration: number,
  type: OscillatorType,
  gain = 0.12
) {
  const audio = ctx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  g.gain.setValueAtTime(0.0001, audio.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, audio.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(
    0.0001,
    audio.currentTime + start + duration
  );
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
}

export function playCorrectSound() {
  tone(523.25, 0, 0.12, "sine", 0.14);
  tone(659.25, 0.1, 0.14, "sine", 0.14);
  tone(783.99, 0.2, 0.18, "sine", 0.12);
}

export function playWrongSound() {
  tone(220, 0, 0.18, "square", 0.07);
  tone(165, 0.14, 0.22, "square", 0.06);
}

export function playCompleteSound() {
  tone(392, 0, 0.12, "sine", 0.12);
  tone(523.25, 0.1, 0.12, "sine", 0.13);
  tone(659.25, 0.2, 0.14, "sine", 0.14);
  tone(783.99, 0.32, 0.16, "sine", 0.14);
  tone(1046.5, 0.48, 0.28, "triangle", 0.11);
}
