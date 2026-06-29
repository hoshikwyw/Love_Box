"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";
import { isAnniversaryReached } from "@/lib/time";
import Reveal from "./Reveal";

export default function LockedCard() {
  const [unlocked, setUnlocked] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(story.anniversary);
    setUnlocked(valid && isAnniversaryReached(story.anniversary, new Date()));
  }, []);

  return (
    <section className="flex min-h-[90dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-xl text-center">
        <p className="mb-3 font-script text-2xl text-rose">
          {unlocked ? "open me ♡" : "saving the best for last ♡"}
        </p>

        <motion.div
          whileHover={{ y: -4 }}
          className="relative mx-auto overflow-hidden rounded-[28px] border border-gold/30 bg-gradient-to-b from-[#2a1840] via-[#241640] to-[#160c28] p-10 shadow-glow"
        >
          {/* floating hearts inside the card */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {[12, 38, 62, 84].map((left, idx) => (
              <motion.span
                key={left}
                className="absolute text-lg opacity-40"
                style={{ left: `${left}%`, bottom: -20 }}
                animate={{ y: [-10, -220], opacity: [0, 0.5, 0] }}
                transition={{ duration: 6 + idx, repeat: Infinity, delay: idx * 1.3, ease: "easeOut" }}
              >
                {idx % 2 ? "♡" : "💗"}
              </motion.span>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="sealed"
                exit={{ opacity: 0, scale: 0.92, rotateX: 25 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center gap-6"
              >
                <motion.span
                  className="text-6xl"
                  animate={unlocked ? { rotate: [0, -8, 8, -5, 0] } : { scale: [1, 1.05, 1] }}
                  transition={{ duration: unlocked ? 1.6 : 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {unlocked ? "💌" : "🔐"}
                </motion.span>
                <h2 className="font-serif text-2xl text-mist sm:text-3xl">
                  {unlocked ? "A letter, just for today" : "Sealed until our day"}
                </h2>
                {unlocked ? (
                  <motion.button
                    onClick={() => setOpened(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gradient-to-r from-rose to-gold px-9 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[#2a1530] shadow-moon"
                  >
                    Open it ♡
                  </motion.button>
                ) : (
                  <p className="max-w-sm font-script text-xl text-mist/65">
                    this little letter unlocks itself on our anniversary. some things are
                    worth the wait ♡
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "backOut" }}
                className="relative flex flex-col items-center gap-6"
              >
                {/* burst of hearts on open */}
                <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden>
                  {[-60, -30, 0, 30, 60].map((dx, idx) => (
                    <motion.span
                      key={dx}
                      className="absolute text-2xl"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                      animate={{ x: dx, y: -80 - Math.abs(dx), opacity: 0, scale: 1.2 }}
                      transition={{ duration: 1.1, delay: idx * 0.05, ease: "easeOut" }}
                    >
                      💕
                    </motion.span>
                  ))}
                </div>

                <span className="text-4xl">💫</span>
                <p className="font-serif text-2xl leading-relaxed text-mist sm:text-[1.7rem]">
                  {story.lockedMessage}
                </p>
                <p className="font-script text-2xl text-gold/90">— {story.you.name} ♡</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Reveal>
    </section>
  );
}
