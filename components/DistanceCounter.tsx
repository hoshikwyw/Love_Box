"use client";

import { motion } from "framer-motion";
import { story } from "@/data/story";
import { haversineMiles, milesToKm } from "@/lib/geo";
import Reveal from "./Reveal";

export default function DistanceCounter() {
  const miles = haversineMiles(story.her.coords, story.you.coords);
  const km = milesToKm(miles);

  return (
    <section className="flex min-h-[80dvh] items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-glow/80">
          {story.you.city} to {story.her.city}
        </p>

        <div className="relative mt-6 inline-block">
          <motion.h2
            className="whitespace-nowrap font-serif text-4xl text-mist sm:text-7xl"
            initial={{ opacity: 0.4 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {miles.toLocaleString()} miles apart
          </motion.h2>
          {/* strike-through that draws itself */}
          <motion.span
            className="absolute left-0 top-1/2 h-[3px] w-full origin-left rounded bg-rose"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          />
        </div>

        <p className="mt-3 text-sm text-mist/50">({km.toLocaleString()} km)</p>

        <motion.p
          className="mt-10 font-serif text-4xl text-shimmer sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          0 miles in my heart.
        </motion.p>

        <p className="mt-8 max-w-md mx-auto font-script text-2xl text-rose">
          close enough to drive to — and one day, i will ♡
        </p>
      </Reveal>
    </section>
  );
}
