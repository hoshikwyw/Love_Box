# To The Moon And Back 🌙

A dreamy, cosmic anniversary gift for a long-distance love — **Yangon → Bangkok**.
Two people who met online, fell for each other over FaceTime, and haven't held each
other yet. This little universe is the bridge across the 360 miles between you.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Make it hers

Edit **one file**: [`data/story.ts`](data/story.ts). Fill in every `⟨TBD⟩`:

- `her.name`, `you.name`
- `anniversary` — `YYYY-MM-DD` (powers the days-together logic + unlocks the final letter)
- `meetingDate` — leave `null` for the hopeful "Soon" state; set a date when you know it
- `memories` — drop call screenshots into `public/memories/` and point to them
- `reasons` — your real ones
- `song` — optional; drop an mp3 in `public/` and set `song.src`
- `lockedMessage` — what she reads when the card unlocks

Cities, timezones (`Asia/Bangkok`, `Asia/Yangon`), and the distance are already set —
the distance + dual clocks compute themselves.

## Sections

1. **Hero** — starfield + tonight's real moon phase
2. **Two clocks, one moon** — live Bangkok/Yangon time, goodnight/good-morning aware
3. **The distance** — "360 miles apart" → "0 miles in my heart"
4. **Countdown** — until you finally meet (hopeful "Soon" until you set a date)
5. **Our FaceTime story** — call screenshots as the love story
6. **Reasons I love you** — tap-through deck
7. **The locked card** — unlocks on your anniversary

## Deploy

Push to GitHub, import into [Vercel](https://vercel.com), done. Add a custom domain
for the full effect.

---

No autoplay audio. Mobile-first (she'll open it on her phone). Real timezones, so it
never lies about her time. Built with care. 🤍
