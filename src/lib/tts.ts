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
 * Robust French speech recognition.
 * Chrome often ends sessions after a pause — we auto-restart while active.
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

  // Mic + TTS conflict — stop any speech synthesis first
  stopSpeaking();

  let active = true;
  let recognition: SpeechRecognitionInstance | null = null;
  let finalText = "";
  let restartTimer: ReturnType<typeof setTimeout> | null = null;

  const clearRestart = () => {
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
  };

  const emit = (interim = "") => {
    const combined = `${finalText} ${interim}`.replace(/\s+/g, " ").trim();
    onPartial(combined);
  };

  const create = () => {
    const rec = new Ctor();
    rec.lang = "fr-FR";
    rec.interimResults = true;
    rec.continuous = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      if (active) onStatus?.(true);
    };

    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = result[0]?.transcript ?? "";
        if (result.isFinal) {
          finalText = `${finalText} ${piece}`.replace(/\s+/g, " ").trim();
        } else {
          interim += piece;
        }
      }
      emit(interim);
    };

    rec.onerror = (event) => {
      // Benign / recoverable — keep listening
      if (
        event.error === "no-speech" ||
        event.error === "aborted" ||
        event.error === "audio-capture"
      ) {
        return;
      }
      if (event.error === "not-allowed") {
        active = false;
        onStatus?.(false);
        onError?.("not-allowed");
        return;
      }
      if (event.error === "network") {
        // Try restart; some browsers throw network spuriously
        return;
      }
      onError?.(event.error);
    };

    rec.onend = () => {
      if (!active) {
        onStatus?.(false);
        return;
      }
      // Chrome ends recognition after silence — restart automatically
      clearRestart();
      restartTimer = setTimeout(() => {
        if (!active) return;
        try {
          createAndStart();
        } catch {
          onStatus?.(false);
          onError?.("restart-failed");
        }
      }, 250);
    };

    recognition = rec;
    return rec;
  };

  const createAndStart = () => {
    const rec = create();
    try {
      rec.start();
    } catch {
      // InvalidStateError if already started — ignore
    }
  };

  createAndStart();

  return {
    supported: true,
    stop: () => {
      active = false;
      clearRestart();
      onStatus?.(false);
      try {
        if (recognition) {
          recognition.onend = null;
          recognition.abort();
        }
      } catch {
        try {
          recognition?.stop();
        } catch {
          /* ignore */
        }
      }
    },
  };
}
