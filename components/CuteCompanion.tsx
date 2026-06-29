"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";

/** Luna — a tiny moon mascot who floats in the corner and whispers sweet things. */
export default function CuteCompanion() {
  const lines = [
    `hi ${story.her.name} ♡`,
    "you are so, so loved",
    `${story.you.name} can't stop thinking about you`,
    "360 miles is nothing for us",
    "look at the moon tonight 🌙",
    "you make him the happiest",
    "psst… you're his favorite person",
  ];

  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  const [kiss, setKiss] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % lines.length);
        setShow(true);
      }, 500);
    }, 5200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(0.75rem+env(safe-area-inset-left))] z-40 flex items-end gap-2 sm:bottom-8 sm:left-8 sm:gap-3">
      {/* Luna */}
      <motion.button
        onClick={() => setKiss((k) => k + 1)}
        className="relative"
        aria-label="Send a kiss"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: -6 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* kiss hearts on click */}
        <AnimatePresence>
          {kiss > 0 && (
            <motion.span
              key={kiss}
              className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-xl"
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -50, opacity: 0, scale: 1.3 }}
              transition={{ duration: 1 }}
            >
              😘
            </motion.span>
          )}
        </AnimatePresence>

        {/* glow */}
        <span className="absolute inset-0 rounded-full bg-gold/30 blur-xl" />

        {/* moon face */}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#fff7e0] to-gold shadow-moon">
          {/* eyes (blink) */}
          <motion.span
            className="absolute left-[30%] top-[42%] h-2 w-2 rounded-full bg-[#5a4a2a]"
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
          />
          <motion.span
            className="absolute right-[30%] top-[42%] h-2 w-2 rounded-full bg-[#5a4a2a]"
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
          />
          {/* blush */}
          <span className="absolute left-[18%] top-[55%] h-2 w-2.5 rounded-full bg-rose/70 blur-[1px]" />
          <span className="absolute right-[18%] top-[55%] h-2 w-2.5 rounded-full bg-rose/70 blur-[1px]" />
          {/* smile */}
          <span className="absolute top-[58%] h-2 w-3.5 rounded-b-full border-b-2 border-[#5a4a2a]" />
        </span>
      </motion.button>

      {/* speech bubble */}
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -8 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="relative mb-3 max-w-[180px] rounded-2xl rounded-bl-sm border border-rose/30 bg-white/[0.08] px-4 py-2 backdrop-blur-md"
          >
            <p className="font-script text-lg leading-tight text-mist">{lines[i]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
