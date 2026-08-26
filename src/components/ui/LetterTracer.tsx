"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";

const SIZE = 280;

export function LetterTracer({
  letter,
  onCorrect,
}: {
  letter: string;
  onCorrect?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "bad">("idle");

  const redrawGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Guide letter (hollow outline style)
    ctx.save();
    ctx.font =
      '220px "Nunito", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(6, 43, 86, 0.22)";
    ctx.strokeText(letter, SIZE / 2, SIZE / 2 + 8);
    ctx.restore();

    // Baseline guides
    ctx.strokeStyle = "rgba(6, 43, 86, 0.08)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(24, SIZE * 0.72);
    ctx.lineTo(SIZE - 24, SIZE * 0.72);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    setFeedback("idle");
    redrawGuide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * SIZE,
      y: ((e.clientY - rect.top) / rect.height) * SIZE,
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    setFeedback("idle");
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pos(e);
    ctx.strokeStyle = "#FD7035";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const onPointerUp = () => {
    drawing.current = false;
  };

  const clear = () => {
    setFeedback("idle");
    redrawGuide();
  };

  const check = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Build mask of ideal letter
    const mask = document.createElement("canvas");
    mask.width = SIZE;
    mask.height = SIZE;
    const mctx = mask.getContext("2d");
    if (!mctx) return;
    mctx.fillStyle = "#000";
    mctx.font =
      '220px "Nunito", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
    mctx.textAlign = "center";
    mctx.textBaseline = "middle";
    mctx.fillText(letter, SIZE / 2, SIZE / 2 + 8);
    const maskData = mctx.getImageData(0, 0, SIZE, SIZE).data;

    // User drawing: sample current canvas at 1x by redrawing user strokes from pixels
    // Read display canvas (scaled) — use temp 1x canvas copy
    const user = document.createElement("canvas");
    user.width = SIZE;
    user.height = SIZE;
    const uctx = user.getContext("2d");
    if (!uctx) return;
    uctx.drawImage(canvas, 0, 0, SIZE, SIZE);
    const userData = uctx.getImageData(0, 0, SIZE, SIZE).data;

    let letterPixels = 0;
    let hit = 0;
    let userInk = 0;
    let nearLetter = 0;

    const isLetter = (i: number) => maskData[i + 3] > 40;
    const isUserInk = (i: number) => {
      // orange-ish drawn pixels (not the light guide)
      const r = userData[i];
      const g = userData[i + 1];
      const b = userData[i + 2];
      const a = userData[i + 3];
      return a > 40 && r > 180 && g < 160 && b < 120;
    };

    for (let y = 0; y < SIZE; y += 2) {
      for (let x = 0; x < SIZE; x += 2) {
        const i = (y * SIZE + x) * 4;
        if (isLetter(i)) {
          letterPixels += 1;
          // neighborhood search for user ink
          let found = false;
          for (let dy = -10; dy <= 10 && !found; dy += 2) {
            for (let dx = -10; dx <= 10 && !found; dx += 2) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue;
              const j = (ny * SIZE + nx) * 4;
              if (isUserInk(j)) found = true;
            }
          }
          if (found) hit += 1;
        }
        if (isUserInk(i)) {
          userInk += 1;
          let near = false;
          for (let dy = -12; dy <= 12 && !near; dy += 3) {
            for (let dx = -12; dx <= 12 && !near; dx += 3) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue;
              const j = (ny * SIZE + nx) * 4;
              if (isLetter(j)) near = true;
            }
          }
          if (near) nearLetter += 1;
        }
      }
    }

    const coverage = letterPixels ? hit / letterPixels : 0;
    const precision = userInk ? nearLetter / userInk : 0;
    const ok = coverage >= 0.42 && precision >= 0.55 && userInk > 80;

    if (ok) {
      playCorrectSound();
      setFeedback("ok");
      onCorrect?.();
    } else {
      playWrongSound();
      setFeedback("bad");
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#062B56]/60">
        Մատով նկարե՛ք տառը՝ <strong className="text-[#062B56]">{letter}</strong>
      </p>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="rounded-[24px] border-2 border-[#C7E0E7] touch-none shadow-sm bg-[#FAFAFA] cursor-crosshair"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="soft" className="flex-1" onClick={clear}>
          Մաքրել
        </Button>
        <Button type="button" className="flex-1" onClick={check}>
          Ստուգել
        </Button>
      </div>
      {feedback === "ok" && (
        <p className="text-center font-bold text-[#062B56]">✓ Ճիշտ է</p>
      )}
      {feedback === "bad" && (
        <p className="text-center font-bold text-[#FD7035]">Նորի՛ց փորձիր</p>
      )}
    </div>
  );
}
