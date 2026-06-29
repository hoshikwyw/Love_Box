"use client";

import { motion } from "framer-motion";
import { story } from "@/data/story";
import Reveal from "./Reveal";

// Gentle, hand-pinned tilts so the wall feels arranged by hand, not by a grid.
const TILTS = [-4, 3, -2.5, 4, -3.5, 2];
const TAPES = ["#f6a5c0", "#f5d488", "#a78bfa", "#cdd6ff"];

export default function FaceTimeGallery() {
  return (
    <section className="px-6 py-24">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className="mb-2 font-script text-2xl text-rose">us, pixel by pixel ♡</p>
        <h2 className="font-serif text-3xl text-mist sm:text-4xl">
          Our FaceTime story
        </h2>
        <p className="mt-3 text-mist/60">
          we fell in love through a screen. that&rsquo;s not less of a love story —
          it&rsquo;s ours.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 flex max-w-5xl flex-wrap items-start justify-center gap-y-14 gap-x-10">
        {story.memories.map((m, i) => {
          const tilt = TILTS[i % TILTS.length];
          const tape = TAPES[i % TAPES.length];
          return (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, y: -8, zIndex: 20 }}
              className="group relative w-[280px] rounded-[14px] bg-gradient-to-b from-white to-[#f7f2ff] p-3 pb-0 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
              style={{ transformOrigin: "center" }}
            >
              {/* washi tape */}
              <span
                className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 rounded-[2px] opacity-80 shadow-sm"
                style={{ background: tape, mixBlendMode: "screen" }}
                aria-hidden
              />
              {/* heart that pops on hover */}
              <motion.span
                className="absolute -right-2 -top-2 z-10 text-2xl drop-shadow"
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i % 4) * 0.1, type: "spring", stiffness: 300 }}
                aria-hidden
              >
                💕
              </motion.span>

              <div className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-gradient-to-br from-nebula/60 to-night">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image}
                    alt={m.caption}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-mist/50">
                    <motion.span
                      className="text-4xl"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    >
                      📸
                    </motion.span>
                    <span className="text-[0.6rem] uppercase tracking-[0.25em]">
                      add a call screenshot
                    </span>
                  </div>
                )}
                {/* glossy sheen sweep on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>

              <figcaption className="px-1 py-4 text-center">
                <p className="font-script text-xl leading-snug text-[#3a2b4a]">
                  {m.caption}
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-[#9a86b4]">
                  {m.date}
                </p>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
