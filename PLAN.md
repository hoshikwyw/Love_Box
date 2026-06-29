# To The Moon And Back 🌙

A digital anniversary gift for a long-distance relationship — two people who met online,
fell in love over FaceTime, and haven't held each other yet. This app is the bridge across
the distance and the countdown to the day the screen becomes real life.

> Status: **Planning**. Decisions still open are marked `⟨TBD⟩`.

---

## 1. Open decisions (fill these in)

| Thing | Status | Notes |
|---|---|---|
| Visual vibe | ⟨TBD⟩ | Dreamy/cosmic · warm/cozy · playful · elegant-minimal. Decide before styling pass. |
| Her name | ⟨TBD⟩ | Used in hero + constellation. |
| Your name | ⟨TBD⟩ | |
| Her city + timezone | ⟨TBD⟩ | Drives live clock + map pin. |
| Your city + timezone | ⟨TBD⟩ | Drives live clock + map pin. |
| Anniversary date | ⟨TBD⟩ | When you became "official" — powers the days-together counter + unlocks final card. |
| First-meeting date | **Not yet** | Countdown shows "Soon — I'm working on it." Swap to a real date later in one line. |
| Your song | ⟨TBD⟩ | Title/artist or an audio file. Tasteful play button, never autoplay. |

All of the above will live in a single `data/story.ts` file so the personal content is in
ONE place — no hunting through components.

---

## 2. Tech stack

- **Next.js (App Router) + TypeScript** — fast, deployable to Vercel with a real shareable link.
- **Tailwind CSS** — quick, consistent styling once the vibe is chosen.
- **Framer Motion** — scroll reveals + buttery transitions.
- **No database** — everything is static content in `story.ts`. Cheaper, faster, zero maintenance.
- **Deploy:** Vercel + optional custom domain (e.g. something only the two of you get).

Fallback option if you'd rather not have a build step: a single self-contained `index.html`.
We chose the Next.js route for polish; noting the alternative here.

---

## 3. Sections (in scroll order)

1. **Hero — One Sky**
   - Night sky, twinkling stars (canvas), a real moon-phase render.
   - Line: *"I'd go to the moon and back for you."* Her name written in the stars.

2. **Two Clocks, One Moon**
   - Live dual timezone clocks (her time / your time), updating every second.
   - Dynamic line: *"It's 9:14 PM where you are, 8:14 AM where I am — same moon."*
   - Auto "goodnight / good morning" badge based on whose side is in night.

3. **The Distance**
   - Big number: *"7,431 miles apart"* → crosses out → *"0 miles in my heart."*
   - Small animated plane tracing the route between your two cities on a minimal map.

4. **The Countdown That Matters**
   - Toward the first-meeting date. While unknown: *"Soon. I'm working on it."*

5. **Our FaceTime Story**
   - Gallery of call screenshots / clips. The medium IS the love story — lean in.
   - Each item: date + one-line memory.

6. **Reasons I Love You (Across an Ocean)**
   - Flip-card / shuffling deck. e.g. *"Reason #88: you stayed on call till 4am your time."*

7. **The Locked Card**
   - Unlocks on the anniversary date — a personal message / promise about the day you meet.

8. **Footer**
   - Quiet sign-off. Maybe the date you first matched/called.

---

## 4. File structure

```
ToTheMoonAndBack/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx            # assembles the sections in order
│  └─ globals.css
├─ components/
│  ├─ Hero.tsx
│  ├─ StarfieldCanvas.tsx
│  ├─ MoonPhase.tsx
│  ├─ DualClock.tsx
│  ├─ DistanceCounter.tsx
│  ├─ MeetingCountdown.tsx
│  ├─ FaceTimeGallery.tsx
│  ├─ ReasonsDeck.tsx
│  └─ LockedCard.tsx
├─ data/
│  └─ story.ts            # ★ ALL personal content lives here
├─ lib/
│  ├─ time.ts             # timezone helpers
│  └─ geo.ts              # haversine distance between the two cities
├─ public/
│  └─ memories/           # her photos / call screenshots
└─ PLAN.md
```

---

## 5. Build order

1. Scaffold Next.js + Tailwind + Framer Motion, set up `story.ts` schema.
2. Hero + Starfield + MoonPhase (the emotional first impression).
3. DualClock + time helpers (the technical centerpiece of an LDR app).
4. DistanceCounter + map route.
5. MeetingCountdown (hopeful "Soon" state first).
6. FaceTimeGallery + ReasonsDeck.
7. LockedCard with date-gated unlock.
8. Styling pass once **vibe** is chosen.
9. Deploy to Vercel, wire custom domain, final content fill.

---

## 6. Tasteful guardrails

- **No autoplay audio.** A clear play button. Surprising her with sound is a bug, not a feature.
- **Mobile-first.** She'll almost certainly open this on her phone.
- **Works across timezones / DST.** Use real timezone IDs (e.g. `America/New_York`), not fixed offsets.
- **Personal > flashy.** One real memory beats ten animations.
