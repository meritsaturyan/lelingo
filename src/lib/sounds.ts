/** Feedback sounds via Web Audio — mobile-safe unlock + resume. */

let sharedCtx: AudioContext | null = null;
let unlockBound = false;

function getAC(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  return (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext ||
    null
  );
}

function getCtx(): AudioContext | null {
  const AC = getAC();
  if (!AC) return null;
  if (!sharedCtx) sharedCtx = new AC();
  return sharedCtx;
}

/** Must run inside a user gesture on iOS/Android or audio stays silent. */
export function unlockAudio(): void {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") {
    void audio.resume();
  }
  // Prime a near-silent blip so iOS fully unlocks the context
  try {
    const buffer = audio.createBuffer(1, 1, audio.sampleRate);
    const src = audio.createBufferSource();
    src.buffer = buffer;
    const g = audio.createGain();
    g.gain.value = 0.001;
    src.connect(g);
    g.connect(audio.destination);
    src.start(0);
  } catch {
    /* ignore */
  }
}

/** Bind once: any tap unlocks Web Audio for the rest of the session. */
export function bindAudioUnlock(): void {
  if (typeof window === "undefined" || unlockBound) return;
  unlockBound = true;
  const once = () => {
    unlockAudio();
    window.removeEventListener("touchstart", once, true);
    window.removeEventListener("pointerdown", once, true);
    window.removeEventListener("click", once, true);
  };
  window.addEventListener("touchstart", once, { capture: true, passive: true });
  window.addEventListener("pointerdown", once, { capture: true });
  window.addEventListener("click", once, { capture: true });
}

async function ensureReady(): Promise<AudioContext | null> {
  const audio = getCtx();
  if (!audio) return null;
  if (audio.state === "suspended") {
    try {
      await audio.resume();
    } catch {
      return null;
    }
  }
  return audio.state === "running" ? audio : audio;
}

function scheduleTone(
  audio: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  type: OscillatorType,
  gain = 0.28
) {
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audio.currentTime + start);
  const t0 = audio.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.025);
  g.gain.linearRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.03);
}

async function playTones(
  notes: { f: number; start: number; dur: number; type: OscillatorType; gain: number }[]
) {
  unlockAudio();
  const audio = await ensureReady();
  if (!audio) return;
  for (const n of notes) {
    scheduleTone(audio, n.f, n.start, n.dur, n.type, n.gain);
  }
}

export function playCorrectSound() {
  void playTones([
    { f: 523.25, start: 0, dur: 0.14, type: "sine", gain: 0.32 },
    { f: 659.25, start: 0.11, dur: 0.16, type: "sine", gain: 0.32 },
    { f: 783.99, start: 0.22, dur: 0.2, type: "sine", gain: 0.28 },
  ]);
}

export function playWrongSound() {
  void playTones([
    { f: 240, start: 0, dur: 0.2, type: "square", gain: 0.18 },
    { f: 180, start: 0.16, dur: 0.24, type: "square", gain: 0.16 },
  ]);
}

export function playCompleteSound() {
  void playTones([
    { f: 392, start: 0, dur: 0.14, type: "sine", gain: 0.28 },
    { f: 523.25, start: 0.12, dur: 0.14, type: "sine", gain: 0.3 },
    { f: 659.25, start: 0.24, dur: 0.16, type: "sine", gain: 0.32 },
    { f: 783.99, start: 0.38, dur: 0.18, type: "sine", gain: 0.3 },
    { f: 1046.5, start: 0.55, dur: 0.32, type: "triangle", gain: 0.26 },
  ]);
}
