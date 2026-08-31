"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import "./CroissantCharacter.css";
import {
  ALL_LAYER_SRCS,
  BLINK_TIMING,
  BODY_SRC,
  DEMO_TALK_CYCLE,
  EYE_SRC,
  EYEBROWS_SRC,
  MOUTH_SRC,
  TALK_MOUTH_CYCLE,
  TALK_TIMING,
  type CroissantEmotion,
  type EyeState,
  type MouthState,
} from "./croissantTypes";

export type { EyeState, MouthState, CroissantEmotion };

export type CroissantCharacterProps = {
  eyeState?: EyeState;
  mouthState?: MouthState;
  /** Preset expression; when set, drives eyes/mouth + blink/talk defaults. */
  emotion?: CroissantEmotion | null;
  autoBlink?: boolean;
  autoTalk?: boolean;
  showDebug?: boolean;
  className?: string;
  /** Display width; height follows 1:1. */
  size?: number | string;
};

function emotionDefaults(
  emotion: CroissantEmotion | null | undefined
): { eye: EyeState; mouth: MouthState; blink: boolean; talk: boolean } | null {
  if (!emotion) return null;
  switch (emotion) {
    case "idle":
      return { eye: "open", mouth: "smile", blink: true, talk: false };
    case "talking":
      return { eye: "open", mouth: "small", blink: true, talk: true };
    case "happy":
      return { eye: "closed", mouth: "smile", blink: false, talk: false };
    case "surprised":
      return { eye: "open", mouth: "round", blink: true, talk: false };
    default:
      return null;
  }
}

export function CroissantCharacter({
  eyeState: eyeProp,
  mouthState: mouthProp,
  emotion = null,
  autoBlink = true,
  autoTalk = false,
  showDebug = false,
  className = "",
  size,
}: CroissantCharacterProps) {
  const [localEmotion, setLocalEmotion] = useState<CroissantEmotion | null>(
    emotion
  );
  const activeEmotion = showDebug ? localEmotion : emotion;
  const preset = emotionDefaults(activeEmotion);

  const [eye, setEye] = useState<EyeState>(
    eyeProp ?? preset?.eye ?? "open"
  );
  const [mouth, setMouth] = useState<MouthState>(
    mouthProp ?? preset?.mouth ?? "smile"
  );
  const [loaded, setLoaded] = useState(false);

  const blinkEnabled = preset ? preset.blink : autoBlink;
  const talkEnabled = preset ? preset.talk : autoTalk;

  const blinkingRef = useRef(false);
  const blinkTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const talkTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const talkIdx = useRef(0);
  const nextBlinkAt = useRef(0);
  const demoTalkTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearBlinkTimers = useCallback(() => {
    blinkTimers.current.forEach(clearTimeout);
    blinkTimers.current = [];
    blinkingRef.current = false;
  }, []);

  const clearDemoTalk = useCallback(() => {
    demoTalkTimers.current.forEach(clearTimeout);
    demoTalkTimers.current = [];
  }, []);

  const setMouthState = useCallback((state: MouthState) => {
    setMouth(state);
  }, []);

  const setEyeState = useCallback((state: EyeState) => {
    setEye(state);
  }, []);

  useEffect(() => {
    if (!showDebug) setLocalEmotion(emotion);
  }, [emotion, showDebug]);

  useEffect(() => {
    if (preset) {
      setEyeState(preset.eye);
      setMouthState(preset.mouth);
      return;
    }
    if (eyeProp) setEyeState(eyeProp);
  }, [eyeProp, preset, setEyeState, setMouthState]);

  useEffect(() => {
    if (preset) return;
    if (mouthProp) setMouthState(mouthProp);
  }, [mouthProp, preset, setMouthState]);

  useEffect(() => {
    let cancelled = false;
    let remaining = ALL_LAYER_SRCS.length;
    ALL_LAYER_SRCS.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        remaining -= 1;
        if (!cancelled && remaining <= 0) setLoaded(true);
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const runBlink = useCallback(() => {
    if (blinkingRef.current) return;
    blinkingRef.current = true;
    const steps: { eye: EyeState; ms: number }[] = [
      { eye: "half", ms: BLINK_TIMING.openToHalf },
      { eye: "closed", ms: BLINK_TIMING.halfToClosed },
      { eye: "closed", ms: BLINK_TIMING.closedHold },
      { eye: "half", ms: BLINK_TIMING.closedToHalf },
      { eye: "open", ms: BLINK_TIMING.halfToOpen },
    ];

    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        blinkingRef.current = false;
        if (!preset || preset.blink) setEyeState("open");
        return;
      }
      const step = steps[i];
      setEyeState(step.eye);
      i += 1;
      const t = setTimeout(tick, step.ms);
      blinkTimers.current.push(t);
    };
    tick();
  }, [preset, setEyeState]);

  useEffect(() => {
    if (!blinkEnabled || !loaded) {
      clearBlinkTimers();
      return;
    }

    nextBlinkAt.current =
      Date.now() +
      BLINK_TIMING.gapMin +
      Math.random() * (BLINK_TIMING.gapMax - BLINK_TIMING.gapMin);

    const id = setInterval(() => {
      if (blinkingRef.current) return;
      if (Date.now() < nextBlinkAt.current) return;
      runBlink();
      nextBlinkAt.current =
        Date.now() +
        BLINK_TIMING.gapMin +
        Math.random() * (BLINK_TIMING.gapMax - BLINK_TIMING.gapMin);
    }, 80);

    return () => {
      clearInterval(id);
      clearBlinkTimers();
    };
  }, [blinkEnabled, loaded, runBlink, clearBlinkTimers]);

  useEffect(() => {
    if (talkTimer.current) {
      clearInterval(talkTimer.current);
      talkTimer.current = null;
    }
    if (!talkEnabled || !loaded) {
      if (!talkEnabled && !mouthProp && !preset) {
        setMouthState("smile");
      }
      return;
    }

    talkIdx.current = 0;
    setMouthState(TALK_MOUTH_CYCLE[0]);
    talkTimer.current = setInterval(() => {
      talkIdx.current = (talkIdx.current + 1) % TALK_MOUTH_CYCLE.length;
      setMouthState(TALK_MOUTH_CYCLE[talkIdx.current]);
    }, TALK_TIMING.frameMs);

    return () => {
      if (talkTimer.current) {
        clearInterval(talkTimer.current);
        talkTimer.current = null;
      }
    };
  }, [talkEnabled, loaded, mouthProp, preset, setMouthState]);

  useEffect(() => {
    return () => {
      clearBlinkTimers();
      clearDemoTalk();
      if (talkTimer.current) clearInterval(talkTimer.current);
    };
  }, [clearBlinkTimers, clearDemoTalk]);

  const applyEmotion = (e: CroissantEmotion) => {
    setLocalEmotion(e);
    clearBlinkTimers();
    clearDemoTalk();
    const d = emotionDefaults(e)!;
    setEyeState(d.eye);
    setMouthState(d.mouth);
  };

  const style: CSSProperties | undefined = size
    ? {
        width: typeof size === "number" ? `${size}px` : size,
        maxWidth: "100%",
      }
    : undefined;

  return (
    <div className={showDebug ? "croissant--interactive" : undefined}>
      <div
        className={`croissant ${className}`.trim()}
        style={style}
        role="img"
        aria-label="Animated croissant character"
      >
        <div className="croissant__stage">
          <img
            src={BODY_SRC}
            alt=""
            className={`croissant__layer ${loaded ? "is-visible" : ""}`}
            draggable={false}
          />
          <img
            src={EYEBROWS_SRC}
            alt=""
            className={`croissant__layer ${loaded ? "is-visible" : ""}`}
            draggable={false}
          />
          {(Object.keys(EYE_SRC) as EyeState[]).map((key) => (
            <img
              key={key}
              src={EYE_SRC[key]}
              alt=""
              className={`croissant__layer ${
                loaded && eye === key ? "is-visible" : ""
              }`}
              draggable={false}
            />
          ))}
          {(Object.keys(MOUTH_SRC) as MouthState[]).map((key) => (
            <img
              key={key}
              src={MOUTH_SRC[key]}
              alt=""
              className={`croissant__layer ${
                loaded && mouth === key ? "is-visible" : ""
              }`}
              draggable={false}
            />
          ))}
        </div>
      </div>

      {showDebug && (
        <div className="croissant-debug">
          <span className="croissant-debug__label">Emotion</span>
          {(["idle", "talking", "happy", "surprised"] as CroissantEmotion[]).map(
            (e) => (
              <button
                key={e}
                type="button"
                className={activeEmotion === e ? "is-active" : ""}
                onClick={() => applyEmotion(e)}
              >
                {e === "idle"
                  ? "Idle"
                  : e === "talking"
                    ? "Talk"
                    : e === "happy"
                      ? "Happy"
                      : "Surprised"}
              </button>
            )
          )}

          <span className="croissant-debug__label">Eyes</span>
          {(["open", "half", "closed"] as EyeState[]).map((e) => (
            <button
              key={e}
              type="button"
              className={eye === e ? "is-active" : ""}
              onClick={() => {
                setLocalEmotion(null);
                clearBlinkTimers();
                setEyeState(e);
              }}
            >
              {e[0].toUpperCase() + e.slice(1)}
            </button>
          ))}

          <span className="croissant-debug__label">Mouth</span>
          {(
            [
              ["smile", "Smile"],
              ["small", "Small"],
              ["wide", "Wide"],
              ["round", "Round"],
              ["wide1", "Wide 1"],
            ] as [MouthState, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              className={mouth === m ? "is-active" : ""}
              onClick={() => {
                setLocalEmotion(null);
                clearDemoTalk();
                setMouthState(m);
              }}
            >
              {label}
            </button>
          ))}

          <span className="croissant-debug__label">Actions</span>
          <button
            type="button"
            onClick={() => {
              setLocalEmotion(null);
              runBlink();
            }}
          >
            Blink
          </button>
          <button
            type="button"
            onClick={() => {
              setLocalEmotion(null);
              clearDemoTalk();
              let i = 0;
              const play = () => {
                if (i >= DEMO_TALK_CYCLE.length) return;
                setMouthState(DEMO_TALK_CYCLE[i]);
                i += 1;
                const t = setTimeout(play, TALK_TIMING.frameMs);
                demoTalkTimers.current.push(t);
              };
              play();
            }}
          >
            Talk
          </button>
        </div>
      )}
    </div>
  );
}
