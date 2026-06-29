"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; tw: number; phase: number; pink: boolean };
type Heart = { x: number; y: number; s: number; vy: number; vx: number; a: number; sway: number };
type Shooter = { x: number; y: number; len: number; vx: number; vy: number; life: number };

function heartPath(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
  ctx.closePath();
}

/** A living, lovey sky: twinkling stars, drifting hearts, the occasional wish. */
export default function StarfieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let hearts: Heart[] = [];
    let shooters: Shooter[] = [];
    let raf = 0;
    let t = 0;
    let frame = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const spawnHeart = (w: number, h: number, atBottom = true): Heart => ({
      x: rnd(0, w),
      y: atBottom ? h + rnd(0, 60) * dpr : rnd(0, h),
      s: rnd(6, 16) * dpr,
      vy: rnd(0.15, 0.5) * dpr,
      vx: rnd(-0.1, 0.1) * dpr,
      a: rnd(0.25, 0.7),
      sway: rnd(0, Math.PI * 2),
    });

    const seed = () => {
      const w = (canvas.width = window.innerWidth * dpr);
      const h = (canvas.height = window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const count = Math.floor((window.innerWidth * window.innerHeight) / 7000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.4 + 0.3) * dpr,
        tw: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        pink: Math.random() < 0.35,
      }));

      const hcount = Math.floor((window.innerWidth * window.innerHeight) / 90000);
      hearts = Array.from({ length: hcount }, () => spawnHeart(w, h, false));
    };

    const draw = () => {
      t += 0.012;
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // ── stars ──
      for (const s of stars) {
        const a = 0.3 + Math.sin(t * s.tw + s.phase) * 0.45;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.pink
          ? `rgba(246, 165, 192, ${Math.max(0.05, a)})`
          : `rgba(214, 220, 255, ${Math.max(0.05, a)})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.pink ? "rgba(246,165,192,0.9)" : "rgba(167,139,250,0.8)";
        ctx.fill();
      }

      // ── drifting hearts ──
      for (const hh of hearts) {
        hh.sway += 0.02;
        hh.y -= hh.vy;
        hh.x += hh.vx + Math.sin(hh.sway) * 0.25 * dpr;
        if (hh.y < -20 * dpr) Object.assign(hh, spawnHeart(w, h));
        const pulse = hh.a * (0.75 + Math.sin(t * 1.5 + hh.sway) * 0.25);
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(246,165,192,0.8)";
        ctx.fillStyle = `rgba(255, 150, 186, ${pulse})`;
        heartPath(ctx, hh.x, hh.y, hh.s);
        ctx.fill();
        ctx.restore();
      }

      // ── a wish, now and then ──
      if (frame % 280 === 0 && shooters.length < 2) {
        shooters.push({
          x: rnd(w * 0.1, w * 0.8),
          y: rnd(0, h * 0.4),
          len: rnd(120, 220) * dpr,
          vx: rnd(4, 7) * dpr,
          vy: rnd(2, 3.5) * dpr,
          life: 1,
        });
      }
      shooters = shooters.filter((sh) => sh.life > 0);
      for (const sh of shooters) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        const tail = Math.atan2(sh.vy, sh.vx);
        const ex = sh.x - Math.cos(tail) * sh.len;
        const ey = sh.y - Math.sin(tail) * sh.len;
        const grad = ctx.createLinearGradient(sh.x, sh.y, ex, ey);
        grad.addColorStop(0, `rgba(255, 245, 224, ${sh.life})`);
        grad.addColorStop(1, "rgba(246,165,192,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 * dpr;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,245,224,0.9)";
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    seed();
    draw();
    window.addEventListener("resize", seed);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", seed);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
