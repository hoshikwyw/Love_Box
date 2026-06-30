"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";

/** Luna — a tiny dream-moon who naps in the corner and whispers when you tap her. */
export default function CuteCompanion() {
  const lines = [
    `hi ${story.her.name} ♡`,
    "you are so, so loved",
    `${story.you.name} can't stop thinking about you`,
    "360 miles is nothing for us",
    "look at the moon tonight 🌙",
    "you make me the happiest",
    "psst… you're my favorite person",
  ];

  // Each tap advances the whisper and sends up a little heart.
  const [taps, setTaps] = useState(0);
  const [hintGone, setHintGone] = useState(false);

  const i = taps % lines.length;
  const whispering = taps > 0;

  function tap() {
    setTaps((t) => t + 1);
    setHintGone(true);
  }

  return (
    <div className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(0.75rem+env(safe-area-inset-left))] z-40 flex flex-col items-start gap-3 sm:bottom-8 sm:left-8">
      {/* whisper — drifts up and lingers, no boxy chat bubble */}
      <div className="relative h-8 w-[200px] sm:w-[240px]">
        <AnimatePresence mode="wait">
          {whispering && (
            <motion.p
              key={taps}
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.92 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute bottom-0 left-0 max-w-full font-script text-xl leading-tight text-mist drop-shadow-[0_0_10px_rgba(167,139,250,0.45)]"
            >
              <span className="mr-1 text-glow/80">✦</span>
              {lines[i]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Luna herself */}
      <div className="pointer-events-auto relative">
        {/* gentle tap hint */}
        <AnimatePresence>
          {!hintGone && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -right-2 -top-2 z-10 rounded-full bg-rose/80 px-2 py-0.5 text-[10px] font-medium text-night shadow-glow"
            >
              tap me
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          onClick={tap}
          aria-label="Tap Luna for a sweet whisper"
          className="relative block"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, rotate: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* heart that floats up on each tap */}
          <AnimatePresence>
            {taps > 0 && (
              <motion.span
                key={taps}
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-lg"
                initial={{ y: 0, opacity: 1, scale: 0.4 }}
                animate={{ y: -54, opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                💗
              </motion.span>
            )}
          </AnimatePresence>

          {/* soft halo */}
          <span className="absolute -inset-3 rounded-full bg-gold/25 blur-xl" />

          {/* orbiting sparkles */}
          <motion.span
            className="absolute -right-1 top-0 text-xs text-gold"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
          <motion.span
            className="absolute -left-2 bottom-1 text-[10px] text-mist"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            ✦
          </motion.span>

          {/* the dream-moon body */}
          <span
            className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-moon"
            style={{
              background:
                "radial-gradient(circle at 36% 32%, #fffdf3 0%, #fbeebf 42%, #f0cf86 72%, #d9ad57 100%)",
              boxShadow:
                "inset -7px -8px 18px rgba(120,92,40,0.4), inset 5px 5px 12px rgba(255,255,255,0.4), 0 0 60px -12px rgba(245,212,136,0.6)",
            }}
          >
            {/* faint craters for that real-moon feel */}
            <span className="absolute left-[20%] top-[24%] h-2 w-2 rounded-full bg-[#caa45f]/40" />
            <span className="absolute right-[16%] top-[60%] h-2.5 w-2.5 rounded-full bg-[#caa45f]/40" />

            {/* sleepy-happy eyes (curved ^^), with a slow blink */}
            <motion.span
              className="absolute left-[30%] top-[46%] h-2 w-2.5 rounded-t-full border-t-[2.5px] border-[#7a5a2a]"
              animate={{ scaleY: [1, 1, 0.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.93, 0.97, 1] }}
            />
            <motion.span
              className="absolute right-[30%] top-[46%] h-2 w-2.5 rounded-t-full border-t-[2.5px] border-[#7a5a2a]"
              animate={{ scaleY: [1, 1, 0.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.93, 0.97, 1] }}
            />
            {/* rosy cheeks */}
            <span className="absolute left-[16%] top-[58%] h-2 w-2.5 rounded-full bg-rose/70 blur-[1px]" />
            <span className="absolute right-[16%] top-[58%] h-2 w-2.5 rounded-full bg-rose/70 blur-[1px]" />
            {/* tiny content smile */}
            <span className="absolute top-[62%] h-1.5 w-3 rounded-b-full border-b-[2.5px] border-[#7a5a2a]" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
