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

export type SpeechRecognitionResult = {
  transcript: string;
  supported: boolean;
  error?: string;
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } }; length: number } }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

export function getSpeechRecognition(): SpeechRecognitionInstance | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  return new Ctor();
}

export function startListeningFrench(
  onResult: (transcript: string) => void,
  onError?: (error: string) => void
): { stop: () => void; supported: boolean } {
  const recognition = getSpeechRecognition();
  if (!recognition) {
    onError?.("unsupported");
    return { stop: () => {}, supported: false };
  }

  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0]?.[0]?.transcript ?? "";
    onResult(transcript);
  };
  recognition.onerror = (event) => {
    onError?.(event.error);
  };

  recognition.start();
  return {
    supported: true,
    stop: () => {
      try {
        recognition.stop();
      } catch {
        /* ignore */
      }
    },
  };
}
