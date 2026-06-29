"use client";

import dynamic from "next/dynamic";
import { story } from "@/data/story";
import { haversineMiles, milesToKm } from "@/lib/geo";
import Reveal from "./Reveal";

// Leaflet touches `window`, so it can only load in the browser.
const LoveMap = dynamic(() => import("./LoveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] w-full items-center justify-center rounded-[28px] border border-rose/15 bg-white/[0.03] sm:h-[440px]">
      <span className="animate-pulse font-script text-2xl text-rose">
        drawing the little map between us…
      </span>
    </div>
  ),
});

export default function MapSection() {
  const miles = haversineMiles(story.her.coords, story.you.coords);
  const km = milesToKm(miles);

  return (
    <section className="flex min-h-[90dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-3xl text-center">
        <p className="mb-2 font-script text-2xl text-rose">the little gap between us ♡</p>
        <h2 className="mb-3 font-serif text-3xl text-mist sm:text-4xl">
          {story.you.city} → {story.her.city}
        </h2>
        <p className="mb-10 text-mist/60">
          {miles.toLocaleString()} miles ({km.toLocaleString()} km) — and a plane that
          can&rsquo;t wait to make the trip.
        </p>

        <div className="overflow-hidden rounded-[28px] border border-rose/20 shadow-[0_0_60px_-18px_rgba(246,165,192,0.6)]">
          <LoveMap />
        </div>

        <p className="mt-8 font-script text-xl text-gold/90">
          one short flight, and i&rsquo;m finally next to you ♡
        </p>
      </Reveal>
    </section>
  );
}
