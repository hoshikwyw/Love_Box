"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";

/**
 * The first thing she sees: a wrapped gift box. Tapping the bow pops the lid,
 * bursts a shower of hearts, and reveals the page behind it.
 */
export default function OpeningGate() {
  const [open, setOpen] = useState(false); // box-opening animation playing
  const [done, setDone] = useState(false); // gate fully removed

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    setTimeout(() => setDone(true), 1700);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120a26] via-[#0a0719] to-[#070512] px-6 text-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* expanding ring of light when it opens */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-rose via-gold to-glow blur-2xl"
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 14, opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          <motion.p
            className="mb-10 font-script text-3xl text-rose sm:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: open ? 0 : 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            a little surprise for my {story.her.name} ♡
          </motion.p>

          {/* ── The gift box ── */}
          <motion.button
            onClick={handleOpen}
            className="relative mt-4 cursor-pointer"
            aria-label="Open your surprise"
            style={{ width: 208 }}
            animate={open ? {} : { y: [0, -10, 0] }}
            transition={open ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={open ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* hearts that burst out when opened */}
            <AnimatePresence>
              {open &&
                [-110, -70, -35, 0, 35, 70, 110].map((dx, idx) => (
                  <motion.span
                    key={dx}
                    className="absolute left-1/2 top-4 text-3xl"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                    animate={{
                      x: dx,
                      y: -180 - Math.abs(dx) * 1.4,
                      opacity: 0,
                      scale: 1.4,
                      rotate: dx,
                    }}
                    transition={{ duration: 1.3, delay: idx * 0.03, ease: "easeOut" }}
                  >
                    {idx % 2 ? "💕" : "💗"}
                  </motion.span>
                ))}
            </AnimatePresence>

            {/* lid + bow (flies up on open) — flex-centered so it can't drift */}
            <motion.div
              className="absolute inset-x-0 -top-7 z-20 flex justify-center"
              animate={open ? { y: -240, rotate: -18, opacity: 0 } : { y: 0 }}
              transition={{ duration: 0.9, ease: "backIn" }}
            >
              <div className="relative h-12 w-60 rounded-xl bg-gradient-to-b from-[#ff9dbd] to-rose shadow-lg">
                {/* gold stripe down the lid */}
                <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gradient-to-b from-gold to-[#e3b24a]" />
                {/* bow, centered on the lid */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <span className="absolute -left-7 top-0 h-9 w-9 -rotate-[35deg] rounded-[60%_40%_60%_40%] border-4 border-gold bg-gold/40" />
                  <span className="absolute -right-7 top-0 h-9 w-9 rotate-[35deg] rounded-[40%_60%_40%_60%] border-4 border-gold bg-gold/40" />
                  <span className="absolute left-1/2 top-1.5 h-6 w-6 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ffe7a8] to-gold shadow" />
                </div>
              </div>
            </motion.div>

            {/* box body */}
            <motion.div
              className="relative h-44 w-52"
              animate={open ? { y: 30, opacity: 0, scale: 0.85 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-rose to-[#cf6a8e] shadow-[0_20px_50px_-12px_rgba(246,165,192,0.55)]" />
              <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gradient-to-b from-gold to-[#e3b24a]" />
              <div className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 bg-gradient-to-r from-gold/80 to-[#e3b24a]/80" />
              {/* tiny shimmer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
            </motion.div>
          </motion.button>

          <motion.p
            className="mt-12 text-xs uppercase tracking-[0.4em] text-mist/55"
            animate={open ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
            transition={open ? { duration: 0.3 } : { duration: 2, repeat: Infinity }}
          >
            tap to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
