let currentAudio: HTMLAudioElement | null = null;
let speakGeneration = 0;

function speakFrenchBrowser(text: string, rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = Math.min(1, Math.max(0.7, rate));
    utterance.pitch = 1.02;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = [
        "Denise",
        "Google français",
        "Amélie",
        "Thomas",
        "Hortense Online",
        "Julie Online",
        "Natural",
        "Marie",
        "Audrey",
      ];
      for (const name of preferred) {
        const match = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith("fr") &&
            v.name.toLowerCase().includes(name.toLowerCase())
        );
        if (match) return match;
      }
      return (
        voices.find((v) => v.lang === "fr-FR") ||
        voices.find((v) => v.lang.toLowerCase().startsWith("fr"))
      );
    };

    const applyVoice = () => {
      const fr = pickVoice();
      if (fr) utterance.voice = fr;
    };
    applyVoice();
    if (!window.speechSynthesis.getVoices().length) {
      window.speechSynthesis.onvoiceschanged = () => applyVoice();
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

/** High-quality French neural voice (Denise) via API, with browser fallback */
export async function speakFrench(text: string, rate = 0.9): Promise<void> {
  if (typeof window === "undefined") return;
  const gen = ++speakGeneration;
  stopSpeaking(false);

  try {
    const url = `/api/tts?text=${encodeURIComponent(text)}&rate=${rate}`;
    const audio = new Audio(url);
    currentAudio = audio;
    audio.preload = "auto";

    await new Promise<void>((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error("audio_error"));
      const playPromise = audio.play();
      if (playPromise) playPromise.catch(reject);
    });
  } catch {
    // Only fall back if this call is still the latest (avoids overlapping voices)
    if (gen !== speakGeneration) return;
    await speakFrenchBrowser(text, rate);
  } finally {
    if (gen === speakGeneration && currentAudio) {
      currentAudio = null;
    }
  }
}

export function stopSpeaking(bumpGeneration = true) {
  if (typeof window === "undefined") return;
  if (bumpGeneration) speakGeneration += 1;
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.src = "";
    } catch {
      /* ignore */
    }
    currentAudio = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}


export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  return (
    coarse ||
    /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      ua
    )
  );
}

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult:
    | ((event: {
        resultIndex: number;
        results: {
          [index: number]: {
            [index: number]: { transcript: string; confidence?: number };
            isFinal: boolean;
            length: number;
          };
          length: number;
        };
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onspeechend: (() => void) | null;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported(): boolean {
  return !!getSpeechRecognitionCtor();
}

export type ListenController = {
  stop: () => void;
  supported: boolean;
};

/**
 * Mobile Chrome often ends with no-speech immediately.
 * We keep a gentle restart loop until the user stops, we get speech,
 * or the session timeout hits — without the aggressive loop that froze phones.
 */
export function startListeningFrench(
  onPartial: (transcript: string) => void,
  onError?: (error: string) => void,
  onStatus?: (listening: boolean) => void
): ListenController {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) {
    onError?.("unsupported");
    return { stop: () => {}, supported: false };
  }

  stopSpeaking();

  const mobile = isMobileDevice();
  let active = true;
  let recognition: SpeechRecognitionInstance | null = null;
  let finalText = "";
  let gotFinal = false;
  let silenceRestarts = 0;
  let restartTimer: ReturnType<typeof setTimeout> | null = null;
  let safetyTimer: ReturnType<typeof setTimeout> | null = null;
  let emitTimer: ReturnType<typeof setTimeout> | null = null;
  let pendingEmit = "";
  let starting = false;

  const MAX_SILENCE_RESTARTS = mobile ? 16 : 6;
  const RESTART_DELAY_MS = mobile ? 400 : 450;
  const SESSION_MS = mobile ? 28000 : 40000;
  const IDLE_FINISH_AFTER_FINAL_MS = mobile ? 2600 : 2000;

  const clearTimers = () => {
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
    if (safetyTimer) {
      clearTimeout(safetyTimer);
      safetyTimer = null;
    }
    if (emitTimer) {
      clearTimeout(emitTimer);
      emitTimer = null;
    }
  };

  const finish = () => {
    if (!active && !recognition) return;
    active = false;
    clearTimers();
    onStatus?.(false);
    const rec = recognition;
    recognition = null;
    if (!rec) return;
    try {
      rec.onend = null;
      rec.onerror = null;
      rec.onresult = null;
      rec.onstart = null;
      rec.onspeechend = null;
      rec.stop();
    } catch {
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
    }
  };

  const scheduleEmit = (text: string) => {
    pendingEmit = text;
    if (emitTimer) return;
    emitTimer = setTimeout(
      () => {
        emitTimer = null;
        if (pendingEmit) onPartial(pendingEmit);
      },
      mobile ? 120 : 40
    );
  };

  const emit = (interim = "") => {
    scheduleEmit(`${finalText} ${interim}`.replace(/\s+/g, " ").trim());
  };

  const pickBestAlt = (result: {
    [index: number]: { transcript: string; confidence?: number };
    length: number;
  }) => {
    let best = result[0]?.transcript ?? "";
    let bestConf = result[0]?.confidence ?? 0;
    for (let a = 1; a < result.length; a++) {
      const conf = result[a]?.confidence ?? 0;
      if (conf > bestConf) {
        bestConf = conf;
        best = result[a]?.transcript ?? best;
      }
    }
    return best;
  };

  const scheduleRestart = () => {
    if (!active) return;
    if (restartTimer) return;

    if (gotFinal) {
      restartTimer = setTimeout(() => {
        restartTimer = null;
        if (active) finish();
      }, IDLE_FINISH_AFTER_FINAL_MS);
      return;
    }

    if (silenceRestarts >= MAX_SILENCE_RESTARTS) {
      finish();
      if (!finalText) onError?.("no-speech-timeout");
      return;
    }

    silenceRestarts += 1;
    restartTimer = setTimeout(() => {
      restartTimer = null;
      if (!active) return;
      startRecognition();
    }, RESTART_DELAY_MS);
  };

  const startRecognition = () => {
    if (!active || starting) return;
    starting = true;

    if (recognition) {
      const old = recognition;
      recognition = null;
      try {
        old.onend = null;
        old.onerror = null;
        old.onresult = null;
        old.onstart = null;
        old.stop();
      } catch {
        /* ignore */
      }
    }

    const rec = new Ctor();
    recognition = rec;
    rec.lang = "fr-FR";
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 3;

    rec.onstart = () => {
      starting = false;
      if (active) onStatus?.(true);
    };

    rec.onresult = (event) => {
      if (!active) return;
      silenceRestarts = 0;
      // New speech after a final — keep session open longer
      if (restartTimer && gotFinal) {
        clearTimeout(restartTimer);
        restartTimer = null;
      }
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = pickBestAlt(result);
        if (result.isFinal) {
          gotFinal = true;
          finalText = `${finalText} ${piece}`.replace(/\s+/g, " ").trim();
        } else {
          interim += piece;
        }
      }
      emit(interim);
    };

    rec.onerror = (event) => {
      starting = false;
      if (!active) return;

      if (
        event.error === "no-speech" ||
        event.error === "aborted" ||
        event.error === "network"
      ) {
        return;
      }

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        active = false;
        clearTimers();
        onStatus?.(false);
        onError?.("not-allowed");
        return;
      }

      if (event.error === "audio-capture") {
        active = false;
        clearTimers();
        onStatus?.(false);
        onError?.("audio-capture");
        return;
      }
    };

    rec.onend = () => {
      starting = false;
      if (!active) {
        onStatus?.(false);
        return;
      }
      scheduleRestart();
    };

    try {
      rec.start();
    } catch {
      starting = false;
      scheduleRestart();
    }
  };

  onStatus?.(true);
  startRecognition();

  safetyTimer = setTimeout(() => {
    if (active) finish();
  }, SESSION_MS);

  return {
    supported: true,
    stop: finish,
  };
}
