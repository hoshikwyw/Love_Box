"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";
import { timeSince, type Since } from "@/lib/time";
import Reveal from "./Reveal";

function Tick({ value, label, wide }: { value: number; label: string; wide?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative h-14 overflow-hidden rounded-2xl border border-rose/25 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_0_28px_-10px_rgba(246,165,192,0.7)] sm:h-20 ${
          wide ? "w-16 sm:w-24" : "w-12 sm:w-16"
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-serif text-3xl leading-none tabular-nums text-mist sm:text-5xl"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[0.6rem] uppercase tracking-[0.25em] text-mist/55">
        {label}
      </span>
    </div>
  );
}

export default function DaysTogether() {
  const [s, setS] = useState<Since | null>(null);
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(story.anniversary);

  useEffect(() => {
    if (!valid) return;
    const tick = () => setS(timeSince(story.anniversary, new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [valid]);

  return (
    <section className="flex min-h-[90dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-2xl text-center">
        <p className="mb-2 font-script text-2xl text-rose">every second of it ♡</p>
        <h2 className="mb-12 font-serif text-3xl text-mist sm:text-4xl">
          We&rsquo;ve been falling for each other for
        </h2>

        {/* Big beating heart with the day-count inside */}
        <div className="relative mx-auto mb-12 flex h-56 w-56 items-center justify-center">
          {/* soft pulsing halos */}
          <motion.div
            className="absolute inset-0 rounded-full bg-rose/20 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute text-[14rem] leading-none drop-shadow-[0_0_30px_rgba(246,165,192,0.6)]"
            animate={{ scale: [1, 1.08, 1, 1.04, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            💗
          </motion.div>
          <div className="relative z-10 flex flex-col items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={s?.totalDays ?? "x"}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="font-serif text-6xl text-white drop-shadow-lg sm:text-7xl"
              >
                {valid && s ? s.totalDays.toLocaleString() : "∞"}
              </motion.span>
            </AnimatePresence>
            <span className="mt-1 text-xs uppercase tracking-[0.35em] text-white/85">
              days
            </span>
          </div>
        </div>

        {valid && s ? (
          <>
            <p className="mb-8 font-script text-2xl text-gold/90">
              that&rsquo;s {s.years > 0 ? `${s.years} year${s.years > 1 ? "s" : ""}, ` : ""}
              {s.months} month{s.months !== 1 ? "s" : ""} &amp; {s.days} day
              {s.days !== 1 ? "s" : ""} of you ♡
            </p>
            <div className="flex items-center justify-center gap-1.5 sm:gap-4">
              <Tick value={s.totalDays} label="days" wide />
              <span className="mb-6 animate-pulse text-xs text-rose/70 sm:mb-7 sm:text-sm">♡</span>
              <Tick value={s.hours} label="hours" />
              <span className="mb-6 animate-pulse text-xs text-rose/70 sm:mb-7 sm:text-sm">♡</span>
              <Tick value={s.minutes} label="mins" />
              <span className="mb-6 animate-pulse text-xs text-rose/70 sm:mb-7 sm:text-sm">♡</span>
              <Tick value={s.seconds} label="secs" />
            </div>
            <p className="mt-8 text-sm text-mist/55">
              and i&rsquo;d choose you all over again, every single one of them.
            </p>
          </>
        ) : (
          <p className="font-script text-2xl text-gold/90">
            set our anniversary date in <code className="font-sans text-sm text-mist/70">data/story.ts</code> and watch it count every second ♡
          </p>
        )}
      </Reveal>
    </section>
  );
}
