"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import OurStory from "@/components/OurStory";
import FavoriteMoments from "@/components/FavoriteMoments";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import ScrollToTop from "@/components/ScrollToTop";
import InvitationCover from "@/components/InvitationCover";

export default function Home() {
  const [invitationOpened, setInvitationOpened] = useState(false);

  return (
    <main className="min-h-screen relative bg-[#FAF7F2] text-[#2C2723]">
      {/* Keep the cover mounted until its full curtain animation finishes. */}
      <InvitationCover onOpen={() => setInvitationOpened(true)} />

      <div
        aria-hidden={!invitationOpened}
        className={invitationOpened ? "" : "pointer-events-none"}
      >
        <Navbar />
        <Hero />
        <Countdown />
        <Events />
        <OurStory />
        <FavoriteMoments />
        <LocationSection />
        <Footer />
        <ScrollToTop />
      </div>

      {/* Mount the audio controller from the beginning so the cover click can
          trigger playback through the browser's user-gesture allowance. */}
      <div
        className={invitationOpened ? "opacity-100" : "opacity-0 pointer-events-none"}
        aria-hidden={!invitationOpened}
      >
        <MusicToggle />
      </div>
    </main>
  );
}
