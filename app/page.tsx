import { story } from "@/data/story";
import StarfieldCanvas from "@/components/StarfieldCanvas";
import OpeningGate from "@/components/OpeningGate";
import CuteCompanion from "@/components/CuteCompanion";
import Hero from "@/components/Hero";
import DualClock from "@/components/DualClock";
import DistanceCounter from "@/components/DistanceCounter";
import MapSection from "@/components/MapSection";
import DaysTogether from "@/components/DaysTogether";
import MeetingCountdown from "@/components/MeetingCountdown";
import FaceTimeGallery from "@/components/FaceTimeGallery";
import ReasonsDeck from "@/components/ReasonsDeck";
import LockedCard from "@/components/LockedCard";

export default function Page() {
  return (
    <main className="relative">
      {/* The surprise box she taps to reveal everything */}
      <OpeningGate />

      {/* Luna, the little moon mascot, keeps her company */}
      <CuteCompanion />

      {/* The stars live behind the whole page */}
      <StarfieldCanvas />

      <div className="relative z-10">
        <Hero />
        <DualClock />
        <DistanceCounter />
        <MapSection />
        <DaysTogether />
        <MeetingCountdown />
        <FaceTimeGallery />
        <ReasonsDeck />
        <LockedCard />

        <footer className="py-16 text-center text-sm text-mist/50">
          <p className="font-serif text-lg text-mist/70">
            {story.you.city} → {story.her.city}
          </p>
          <p className="mt-2">made with everything I have, for {story.her.name} 🌙</p>
        </footer>
      </div>
    </main>
  );
}
