// Timezone-aware helpers. Everything keys off real IANA timezone ids so DST and
// half-hour offsets (hello, Yangon UTC+6:30) are always correct.

export type ClockParts = {
  time: string; // "9:14 PM"
  hour24: number; // 0-23, in that timezone
  label: string; // "Bangkok"
};

export function clockFor(timezone: string, label: string, now: Date): ClockParts {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const hour24 = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    }).format(now)
  ) % 24;

  return { time, hour24, label };
}

/** Is it night-time (roughly) at this hour? Used for the goodnight/good-morning badge. */
export function isNight(hour24: number): boolean {
  return hour24 >= 21 || hour24 < 6;
}

/** Greeting for a given local hour. */
export function greetingFor(hour24: number): string {
  if (hour24 >= 21 || hour24 < 5) return "Goodnight";
  if (hour24 < 12) return "Good morning";
  if (hour24 < 17) return "Good afternoon";
  return "Good evening";
}

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
};

export function countdownTo(targetISO: string, now: Date): Countdown {
  const target = new Date(targetISO + "T00:00:00").getTime();
  let diff = target - now.getTime();
  const passed = diff <= 0;
  if (passed) diff = 0;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, passed };
}

/** Whole days since a past date (e.g. days together). */
export function daysSince(pastISO: string, now: Date): number {
  const past = new Date(pastISO + "T00:00:00").getTime();
  return Math.max(0, Math.floor((now.getTime() - past) / 86_400_000));
}

export type Since = {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Live, ticking breakdown of how long since a past date. */
export function timeSince(pastISO: string, now: Date): Since {
  const past = new Date(pastISO + "T00:00:00");
  const diff = Math.max(0, now.getTime() - past.getTime());

  const totalDays = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  // Calendar-accurate years / months / days
  let years = now.getFullYear() - past.getFullYear();
  let months = now.getMonth() - past.getMonth();
  let days = now.getDate() - past.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { totalDays, years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days), hours, minutes, seconds };
}

/** True once today is on/after this year's anniversary of the given date. */
export function isAnniversaryReached(anniversaryISO: string, now: Date): boolean {
  const start = new Date(anniversaryISO + "T00:00:00");
  if (isNaN(start.getTime())) return false;
  const thisYear = new Date(
    now.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  return now.getTime() >= thisYear.getTime();
}
