import React from "react";
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

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#FAF7F2] text-[#2C2723]">
      {/* 1. Sticky Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Live Countdown */}
      <Countdown />

      {/* 4. Wedding Events */}
      <Events />

      {/* 5. Our Story */}
      <OurStory />

      {/* 6. Photo Gallery / Favorite Moments */}
      <FavoriteMoments />

      {/* 7. Location & RSVP */}
      <LocationSection />

      {/* 8. Cinematic Final Footer */}
      <Footer />

      {/* 9. Floating Background Music Player */}
      <MusicToggle />

      {/* 10. Floating Scroll To Top Button */}
      <ScrollToTop />
    </main>
  );
}
