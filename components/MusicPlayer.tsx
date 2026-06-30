"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "@/data/story";

/**
 * A gentle floating music player for "our song".
 * Never autoplays — she taps the moon to start it. Loops softly underneath.
 */
export default function MusicPlayer() {
  const { src, title, artist } = story.song;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Keep a comfortable, in-the-background volume.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.55;
  }, []);

  if (!src) return null;

  async function toggle() {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay/permission hiccup — stay paused, she can tap again.
      setPlaying(false);
    }
  }

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(0.75rem+env(safe-area-inset-right))] z-40 flex items-center gap-3 sm:bottom-8 sm:right-8">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onCanPlay={() => setReady(true)}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      {/* now-playing pill — appears once it's playing */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 8 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="relative rounded-2xl rounded-br-sm border border-glow/30 bg-white/[0.08] px-4 py-2 backdrop-blur-md"
          >
            <p className="font-script text-base leading-tight text-mist">{title}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-mist/50">
              {artist}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the play button — a little glowing moon */}
      <motion.button
        onClick={toggle}
        className="relative"
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* pulsing glow while playing */}
        <motion.span
          className="absolute inset-0 rounded-full bg-glow/40 blur-xl"
          animate={playing ? { scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] } : { scale: 1, opacity: 0.4 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* orbiting note while playing */}
        <AnimatePresence>
          {playing && (
            <motion.span
              className="pointer-events-none absolute -top-1 -right-1 text-sm"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -14 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            >
              ♪
            </motion.span>
          )}
        </AnimatePresence>

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#fffdf3] to-gold shadow-moon">
          {playing ? (
            // pause bars
            <span className="flex gap-[5px]">
              <span className="h-4 w-[3px] rounded-full bg-[#5a4a2a]" />
              <span className="h-4 w-[3px] rounded-full bg-[#5a4a2a]" />
            </span>
          ) : (
            // play triangle
            <span className="ml-[3px] h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-[#5a4a2a]" />
          )}
        </span>
      </motion.button>
    </div>
  );
}
