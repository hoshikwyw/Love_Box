"use client";

import { motion } from "framer-motion";
import { story } from "@/data/story";
import MoonPhase from "./MoonPhase";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <MoonPhase size={140} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-script text-3xl text-rose sm:text-4xl"
      >
        for my {story.her.name} ♡
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.7 }}
        className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-shimmer sm:text-6xl"
      >
        {story.hero.line}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="mt-8 max-w-xl text-base text-mist/70 sm:text-lg"
      >
        {story.hero.sub}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="mt-4 font-script text-2xl text-gold/90"
      >
        my favorite person, my whole little universe ♡
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6 }}
        className="mt-16 flex flex-col items-center gap-2 text-mist/50"
      >
        <span className="text-xs uppercase tracking-[0.3em]">scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-glow to-transparent" />
      </motion.div>
    </section>
  );
}
