"use client";

import { useEffect, useState } from "react";
import { story } from "@/data/story";
import { countdownTo, type Countdown } from "@/lib/time";
import Reveal from "./Reveal";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_0_24px_-8px_rgba(245,212,136,0.5)] sm:h-28 sm:w-24">
        <span className="font-serif text-3xl tabular-nums text-gold sm:text-6xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-mist/60">
        {label}
      </span>
    </div>
  );
}

export default function MeetingCountdown() {
  const [cd, setCd] = useState<Countdown | null>(null);

  useEffect(() => {
    if (!story.meetingDate) return;
    const tick = () => setCd(countdownTo(story.meetingDate as string, new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex min-h-[80dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-3xl text-center">
        <p className="mb-2 font-script text-2xl text-rose">counting down ♡</p>
        <h2 className="mb-3 font-serif text-3xl text-mist sm:text-4xl">
          Until I finally hold you
        </h2>

        {!story.meetingDate || !cd ? (
          // The hopeful, no-date-yet state
          <div className="mt-8">
            <p className="font-serif text-5xl text-shimmer sm:text-6xl">Soon.</p>
            <p className="mt-6 text-mist/60">
              I don&rsquo;t have the date yet — but I&rsquo;m working on it. Every plan I
              make, I&rsquo;m making it toward you.
            </p>
          </div>
        ) : cd.passed ? (
          <p className="mt-8 font-serif text-5xl text-shimmer">
            You&rsquo;re here. Finally. 🤍
          </p>
        ) : (
          <div className="mt-10 flex items-start justify-center gap-3 sm:gap-10">
            <Unit value={cd.days} label="days" />
            <Unit value={cd.hours} label="hours" />
            <Unit value={cd.minutes} label="mins" />
            <Unit value={cd.seconds} label="secs" />
          </div>
        )}
      </Reveal>
    </section>
  );
}
