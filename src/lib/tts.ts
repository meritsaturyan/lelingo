export function speakFrench(text: string, rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = rate;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = [
        "Google français",
        "Amélie",
        "Thomas",
        "Marie",
        "Audrey",
        "Microsoft Hortense",
        "Microsoft Julie",
        "fr-FR",
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
    // Voices often load async
    if (!window.speechSynthesis.getVoices().length) {
      window.speechSynthesis.onvoiceschanged = () => applyVoice();
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
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
            [index: number]: { transcript: string };
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

  // Mobile: allow more silence-retries (Chrome ends early), but slow restarts
  const MAX_SILENCE_RESTARTS = mobile ? 12 : 4;
  const RESTART_DELAY_MS = mobile ? 450 : 500;
  const SESSION_MS = mobile ? 20000 : 30000;
  const IDLE_FINISH_AFTER_FINAL_MS = mobile ? 1800 : 1200;

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
      mobile ? 150 : 50
    );
  };

  const emit = (interim = "") => {
    scheduleEmit(`${finalText} ${interim}`.replace(/\s+/g, " ").trim());
  };

  const scheduleRestart = () => {
    if (!active) return;
    if (restartTimer) return;

    // After a final result, wait a bit then finish (user said something)
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

    // Dispose previous instance cleanly before creating a new one
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
    // continuous=true keeps the session open longer on Android Chrome
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      starting = false;
      if (active) onStatus?.(true);
    };

    rec.onresult = (event) => {
      if (!active) return;
      // Got speech — reset silence counter
      silenceRestarts = 0;
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = result[0]?.transcript ?? "";
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

      // These are normal on mobile — recognition will fire onend next
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
      // Keep listening via gentle restart — do NOT finish on first onend
      scheduleRestart();
    };

    try {
      rec.start();
    } catch {
      starting = false;
      // InvalidStateError — try again shortly
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
