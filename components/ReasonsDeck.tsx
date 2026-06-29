"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";
import Reveal from "./Reveal";

export default function ReasonsDeck() {
  const [i, setI] = useState(0);
  const [burst, setBurst] = useState(0);
  const reasons = story.reasons;

  const next = () => {
    setI((p) => (p + 1) % reasons.length);
    setBurst((b) => b + 1);
  };

  return (
    <section className="flex min-h-[85dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-2xl text-center">
        <p className="mb-2 font-script text-2xl text-rose">where do i even start ♡</p>
        <h2 className="mb-3 font-serif text-3xl text-mist sm:text-4xl">
          Reasons I love you
        </h2>
        <p className="mb-12 text-mist/60">across a border, across a screen.</p>

        <div className="relative mx-auto w-full max-w-xl">
          {/* stacked cards peeking out behind, so it feels like a deck */}
          <div className="absolute inset-x-4 -top-3 h-full -rotate-2 rounded-3xl border border-glow/15 bg-white/[0.03]" />
          <div className="absolute inset-x-2 -top-1.5 h-full rotate-1 rounded-3xl border border-rose/15 bg-white/[0.04]" />

          <button onClick={next} className="group relative block w-full" aria-label="Next reason">
            {/* heart burst on tap */}
            <AnimatePresence>
              {burst > 0 && (
                <motion.span
                  key={burst}
                  className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 text-3xl"
                  initial={{ scale: 0.4, y: 0, opacity: 1 }}
                  animate={{ scale: 1.3, y: -60, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  💖
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative min-h-[220px] overflow-hidden rounded-3xl border border-rose/25 bg-gradient-to-br from-[#1b1330] via-[#241640] to-[#2a1530] p-10 shadow-glow"
            >
              {/* little stamp in the corner */}
              <span className="absolute right-5 top-4 flex h-12 w-12 rotate-6 items-center justify-center rounded-md border border-dashed border-gold/40 text-xl">
                ♡
              </span>
              <span className="absolute left-6 top-5 font-script text-lg text-gold/80">
                Reason no.{i + 1}
              </span>

              <AnimatePresence mode="wait">
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mt-10 font-serif text-2xl leading-relaxed text-mist sm:text-[1.7rem]"
                >
                  {reasons[i]}
                </motion.p>
              </AnimatePresence>

              {/* progress dots */}
              <div className="mt-8 flex justify-center gap-1.5">
                {reasons.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === i ? "w-5 bg-rose" : "w-1.5 bg-mist/25"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </button>
        </div>

        <p className="mt-8 font-script text-xl text-mist/55">
          tap for another reason (i have endless) ♡
        </p>
      </Reveal>
    </section>
  );
}
