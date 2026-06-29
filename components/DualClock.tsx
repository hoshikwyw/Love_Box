"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { story } from "@/data/story";
import { clockFor, greetingFor, isNight, type ClockParts } from "@/lib/time";
import Reveal from "./Reveal";

function ClockCard({
  p,
  name,
  photo,
  accent,
}: {
  p: ClockParts;
  name: string;
  photo: string;
  accent: "rose" | "glow";
}) {
  const night = isNight(p.hour24);
  const ring =
    accent === "rose" ? "border-rose/25 shadow-[0_0_50px_-14px_rgba(246,165,192,0.7)]" : "border-glow/25 shadow-[0_0_50px_-14px_rgba(167,139,250,0.7)]";
  const avatarBg = accent === "rose" ? "bg-rose" : "bg-glow";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`relative flex w-60 flex-col items-center gap-3 rounded-[28px] border ${ring} bg-white/[0.04] px-6 py-8 backdrop-blur-md`}
    >
      {/* heart-shaped avatar — her/your photo (placeholder until added) */}
      <motion.div
        className="relative"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-20 w-20">
          {/* colored heart frame */}
          <div className={`absolute inset-0 heart-mask ${avatarBg}`} />
          {/* photo / placeholder, clipped to a slightly smaller heart */}
          <div className="heart-mask absolute inset-[3px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#241640] to-night">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span className="pb-2 font-script text-3xl text-mist/80">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        {/* tiny day/night badge tucked in the corner */}
        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-night/90 text-sm shadow-md ring-1 ring-white/10">
          {night ? "🌙" : "☀️"}
        </span>
      </motion.div>

      <p className="font-serif text-5xl tabular-nums leading-none text-mist">
        {p.time}
      </p>

      <div className="flex flex-col items-center">
        <span className="font-script text-2xl text-rose">{name}</span>
        <span className="text-[0.7rem] uppercase tracking-[0.3em] text-glow/70">
          {p.label}
        </span>
      </div>

      <span className="rounded-full bg-white/[0.06] px-4 py-1 text-xs text-mist/70">
        {greetingFor(p.hour24)}
      </span>
    </motion.div>
  );
}

export default function DualClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <section className="min-h-[85dvh]" aria-hidden />;
  }

  const her = clockFor(story.her.timezone, story.her.city, now);
  const you = clockFor(story.you.timezone, story.you.city, now);

  return (
    <section className="flex min-h-[85dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-3xl text-center">
        <p className="mb-2 font-script text-2xl text-rose">no matter the hour ♡</p>
        <h2 className="mb-3 font-serif text-3xl text-mist sm:text-4xl">
          Two clocks, one moon
        </h2>
        <p className="mb-14 text-mist/60">
          it&rsquo;s {her.time} for you, {you.time} for me — same sky, same heart.
        </p>

        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-6">
          <ClockCard p={her} name={story.her.name} photo={story.her.photo} accent="rose" />

          {/* beating heart connector */}
          <div className="flex flex-row items-center gap-2 sm:flex-col">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-rose/40 sm:block" />
            <span className="h-px w-10 bg-gradient-to-r from-rose/40 to-transparent sm:hidden" />
            <motion.span
              className="text-2xl drop-shadow-[0_0_10px_rgba(246,165,192,0.8)]"
              animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              💗
            </motion.span>
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-glow/40 sm:block" />
            <span className="h-px w-10 bg-gradient-to-l from-glow/40 to-transparent sm:hidden" />
          </div>

          <ClockCard p={you} name={story.you.name} photo={story.you.photo} accent="glow" />
        </div>

        <p className="mt-14 font-script text-xl text-gold/90">
          only 30 minutes apart — practically the same heartbeat ♡
        </p>
      </Reveal>
    </section>
  );
}
