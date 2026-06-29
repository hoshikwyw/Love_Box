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
  const [frac, setFrac] = useState(0.5);

  useEffect(() => {
    setFrac(moonFraction(new Date()));
  }, []);

  // Shift a shadow disk across the moon to mimic the lit fraction.
  const offset = (1 - frac) * size;

  return (
    <div
      className="relative animate-float rounded-full shadow-moon"
      style={{ width: size, height: size }}
      aria-label="Tonight's moon"
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #fff7e0 0%, #f5d488 45%, #d9b25f 100%)",
        }}
      >
        {/* craters */}
        <span className="absolute left-[28%] top-[30%] h-2 w-2 rounded-full bg-black/10" />
        <span className="absolute left-[55%] top-[55%] h-3 w-3 rounded-full bg-black/10" />
        <span className="absolute left-[40%] top-[68%] h-1.5 w-1.5 rounded-full bg-black/10" />
        {/* shadow disk for the phase */}
        <div
          className="absolute top-0 h-full rounded-full bg-nighter/95 blur-[2px]"
          style={{ width: size, left: -offset }}
        />
      </div>
    </div>
  );
}
