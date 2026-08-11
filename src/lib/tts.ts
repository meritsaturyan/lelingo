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

    const voices = window.speechSynthesis.getVoices();
    const fr =
      voices.find((v) => v.lang.startsWith("fr") && v.name.includes("Google")) ||
      voices.find((v) => v.lang.startsWith("fr"));
    if (fr) utterance.voice = fr;

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
 * French speech recognition.
 * Mobile: single-utterance mode (no restart loops — those freeze phones).
 * Desktop: light continuous mode with limited restarts.
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
  let gotResult = false;
  let restartCount = 0;
  let restartTimer: ReturnType<typeof setTimeout> | null = null;
  let safetyTimer: ReturnType<typeof setTimeout> | null = null;
  let emitTimer: ReturnType<typeof setTimeout> | null = null;
  let pendingEmit = "";

  const MAX_DESKTOP_RESTARTS = 2;
  const MOBILE_MAX_MS = 10000;
  const DESKTOP_MAX_MS = 25000;

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
    if (!active) return;
    active = false;
    clearTimers();
    onStatus?.(false);
    try {
      if (recognition) {
        recognition.onend = null;
        recognition.onerror = null;
        recognition.onresult = null;
        recognition.stop();
      }
    } catch {
      try {
        recognition?.abort();
      } catch {
        /* ignore */
      }
    }
  };

  const scheduleEmit = (text: string) => {
    pendingEmit = text;
    // Throttle React updates — prevents UI freeze on phones
    if (emitTimer) return;
    emitTimer = setTimeout(() => {
      emitTimer = null;
      onPartial(pendingEmit);
    }, mobile ? 120 : 40);
  };

  const emit = (interim = "") => {
    const combined = `${finalText} ${interim}`.replace(/\s+/g, " ").trim();
    scheduleEmit(combined);
  };

  const create = () => {
    const rec = new Ctor();
    rec.lang = "fr-FR";
    // Mobile: one shot. Continuous + auto-restart freezes many phones.
    rec.continuous = !mobile;
    rec.interimResults = !mobile;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      if (active) onStatus?.(true);
    };

    rec.onresult = (event) => {
      if (!active) return;
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = result[0]?.transcript ?? "";
        if (result.isFinal) {
          gotResult = true;
          finalText = `${finalText} ${piece}`.replace(/\s+/g, " ").trim();
        } else {
          interim += piece;
        }
      }
      emit(interim);

      // On mobile, end after the first final phrase — avoids freeze loops
      if (mobile && gotResult) {
        onPartial(finalText);
        finish();
      }
    };

    rec.onerror = (event) => {
      if (!active) return;

      if (event.error === "aborted" || event.error === "no-speech") {
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
      // network / other — stop cleanly on mobile instead of looping
      if (mobile) {
        finish();
        if (!gotResult) onError?.("mobile-failed");
        return;
      }
    };

    rec.onend = () => {
      if (!active) {
        onStatus?.(false);
        return;
      }

      // Mobile: never restart — one session only
      if (mobile) {
        finish();
        return;
      }

      // Desktop: limited gentle restarts only if we got nothing yet
      if (gotResult || restartCount >= MAX_DESKTOP_RESTARTS) {
        finish();
        return;
      }

      restartCount += 1;
      clearTimers();
      restartTimer = setTimeout(() => {
        if (!active) return;
        try {
          createAndStart();
        } catch {
          finish();
        }
      }, 600);
    };

    recognition = rec;
    return rec;
  };

  const createAndStart = () => {
    const rec = create();
    try {
      rec.start();
    } catch {
      finish();
      onError?.("start-failed");
    }
  };

  createAndStart();

  // Hard safety timeout so the mic never stays open forever
  safetyTimer = setTimeout(
    () => {
      if (!active) return;
      finish();
    },
    mobile ? MOBILE_MAX_MS : DESKTOP_MAX_MS
  );

  return {
    supported: true,
    stop: finish,
  };
}
