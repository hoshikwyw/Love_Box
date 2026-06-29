import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dreamy / cosmic palette
        night: "#070b1f",
        nighter: "#03050f",
        nebula: "#1a1448",
        aurora: "#6d5dfc",
        glow: "#a78bfa",
        gold: "#f5d488",
        rose: "#f6a5c0",
        mist: "#cdd6ff",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(167, 139, 250, 0.55)",
        moon: "0 0 80px -10px rgba(245, 212, 136, 0.45)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
