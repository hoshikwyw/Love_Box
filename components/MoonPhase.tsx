"use client";

import { useEffect, useState } from "react";

/** Current moon illumination fraction (0 = new, 1 = full). Conway-style approx. */
function moonFraction(date: Date): number {
  const synodic = 29.53058867;
  // Known new moon: 2000-01-06 18:14 UTC
  const known = Date.UTC(2000, 0, 6, 18, 14) / 86_400_000;
  const days = date.getTime() / 86_400_000 - known;
  const age = ((days % synodic) + synodic) % synodic;
  // Illuminated fraction via phase angle
  return (1 - Math.cos((2 * Math.PI * age) / synodic)) / 2;
}

/** The moon you both look at — rendered live, lit to tonight's real phase. */
export default function MoonPhase({ size = 120 }: { size?: number }) {
  const [frac, setFrac] = useState(0.85);

  useEffect(() => {
    setFrac(moonFraction(new Date()));
  }, []);

  // Keep it recognizably the moon — never let the night swallow it whole.
  const lit = 0.4 + frac * 0.6; // 0.4 .. 1.0
  // Soft terminator sweeps from the left as the phase wanes.
  const shadowX = (1 - lit) * 120; // percent offset for the shadow edge

  return (
    <div
      className="relative animate-float rounded-full shadow-moon"
      style={{ width: size, height: size }}
      aria-label="Tonight's moon"
    >
      {/* outer halo */}
      <div
        className="absolute -inset-6 rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,212,136,0.45) 0%, rgba(245,212,136,0) 70%)",
        }}
      />

      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 36% 32%, #fffdf3 0%, #fbeebf 38%, #f0cf86 68%, #d9ad57 100%)",
          boxShadow:
            "inset -10px -12px 28px rgba(120,92,40,0.45), inset 6px 6px 18px rgba(255,255,255,0.35)",
        }}
      >
        {/* craters */}
        <span className="absolute left-[26%] top-[28%] h-3 w-3 rounded-full bg-[#caa45f]/50 shadow-[inset_1px_1px_2px_rgba(120,92,40,0.5)]" />
        <span className="absolute left-[58%] top-[52%] h-4 w-4 rounded-full bg-[#caa45f]/50 shadow-[inset_1px_1px_2px_rgba(120,92,40,0.5)]" />
        <span className="absolute left-[42%] top-[70%] h-2 w-2 rounded-full bg-[#caa45f]/50 shadow-[inset_1px_1px_2px_rgba(120,92,40,0.5)]" />
        <span className="absolute left-[68%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#caa45f]/40" />
        <span className="absolute left-[34%] top-[54%] h-2.5 w-2.5 rounded-full bg-[#caa45f]/40" />

        {/* soft phase terminator — a feathered shadow, never a hard black disk */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at ${shadowX}% 50%, rgba(7,11,31,0.85) 0%, rgba(7,11,31,0.55) 30%, rgba(7,11,31,0) 62%)`,
          }}
        />
      </div>
    </div>
  );
}
