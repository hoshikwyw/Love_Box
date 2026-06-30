// ─────────────────────────────────────────────────────────────────────────────
//  ★ THE ONE FILE YOU EDIT ★
//  Everything personal lives here. Fill in the ⟨TBD⟩ blanks. Nothing else needs
//  to change to make this hers.
// ─────────────────────────────────────────────────────────────────────────────

export type Person = {
  name: string;
  city: string;
  /** IANA timezone id — handles DST correctly. Do NOT use a fixed offset. */
  timezone: string;
  /** Coordinates for the distance line + the map plane. [latitude, longitude] */
  coords: [number, number];
  /** Photo for the clock cards, e.g. "/memories/bee.jpg". Leave "" for a placeholder. */
  photo: string;
};

export type Memory = {
  /** Path under /public, e.g. "/memories/first-call.jpg". Leave "" for a placeholder. */
  image: string;
  date: string; // free text, e.g. "March 2025"
  caption: string;
};

export const story = {
  // ── The two of you ────────────────────────────────────────────────────────
  her: {
    name: "Bee",
    city: "Bangkok",
    timezone: "Asia/Bangkok", // UTC+7
    coords: [13.7563, 100.5018],
    photo: "/herpfp.jpg", // ← drop her photo in /public (e.g. "/memories/bee.jpg") and put the path here
  } as Person,

  you: {
    name: "kayv",
    city: "Yangon",
    timezone: "Asia/Yangon", // UTC+6:30
    coords: [16.8409, 96.1735],
    photo: "/myPfp.jpg", // ← drop your photo in /public (e.g. "/memories/kayv.jpg") and put the path here
  } as Person,

  // ── The dates that matter ──────────────────────────────────────────────────
  // When you became "official". Powers the days-together counter + unlocks the
  // final card on each anniversary. Format: YYYY-MM-DD.
  anniversary: "2026-04-28",

  // The day you'll finally meet in person. Leave null for the hopeful
  // "Soon — I'm working on it." state. Set to "YYYY-MM-DD" when you know.
  meetingDate: null as string | null,

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    line: "I never expected to find love again.",
    sub: "I don't know when the shift happened, but I suddenly realized that somewhere in the quiet, I had fallen deeply in love with you.",
  },

  // ── Your song (optional) ───────────────────────────────────────────────────
  // Drop an mp3 in /public, e.g. "/our-song.mp3". Leave "" to hide the player.
  // NEVER autoplay — there is a play button on purpose.
  song: {
    src: "/until-i-found-you.mp3",
    title: "Until I Found You",
    artist: "Stephen Sanchez",
  },

  // ── Our FaceTime story ─────────────────────────────────────────────────────
  memories: [
    { image: "/firstMet.png", date: "31 March 2026", caption: "The memory of us meeting still feels like magic. Thank you for sending that first text and sparking the most beautiful chapter of my life." },
    { image: "/firstMove.png", date: "20 April 2026", caption: "I remember asking you to be mine, knowing your heart had been hurt before. I made a promise to protect you, and every day since, my goal has been to ensure your tears are only ever tears of joy." },
    { image: "/sayYes.jpg", date: "28 April 2026", caption: "I can still hear the echo of the first time you said it. It was the sweetest melody my heart has ever played." },
    { image: "/sheSleep.jpg", date: "16 May 2026", caption: "I find myself counting the days until our nights don't end in 'goodbye,' but in holding you close until the dawn finally breaks." },
  ] as Memory[],

  // ── Little notes for her (across the border) ───────────────────────────────
  // Short heartfelt notes shown one card at a time. (Key stays `reasons` so the
  // component keeps working — only the wording on screen says "notes".)
  reasons: [
    "I find myself struggling to explain why I love you, and then I realize it’s because my love for you has no reason—it is simply as natural and essential as breathing. I am just, deeply and completely, in love with you.",
    "No matter how exhausting the world becomes, the sound of your voice is my sanctuary. It heals the heaviness of my day and fills me with a kind of energy I never knew I was capable of feeling.",
    "I know I tease you often, but it’s only because there is something so incredibly endearing about the way you scold me. It’s my favorite way to be reminded of your passion and your focus.",
    "My greatest joy is knowing I’ve played a part in your happiness. Your smile is the light that guides me, and I would spend every day of my life doing whatever it takes to keep that glow in your eyes.",
    "I want to be by your side through every season, whether you are laughing or hurting. I want to be your home—a safe place where you can always return. When life gets rough, you don’t have to carry it alone; come to me, and I will always be here to hold you close and keep you warm.",
  ],

  // ── The locked card (unlocks on your anniversary) ──────────────────────────
  lockedMessage:
    "One day soon, the screen turns into your hand in mine. Until then — to the moon and back, and 360 miles is nothing. I'm coming to find you. 💫",
};

export type Story = typeof story;
