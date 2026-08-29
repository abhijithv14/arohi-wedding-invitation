"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function Hero() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const target = new Date(weddingConfig.countdownTargetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setDaysLeft(Math.floor(difference / (1000 * 60 * 60 * 24)));
      } else {
        setDaysLeft(0);
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#121110]"
    >
      {/* Parallax Background Photograph */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${weddingConfig.galleryPhotos[0]?.src || "/images/hero.jpg"}')` }}
      >
        {/* Dark Vignette Overlay for Crisp Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 flex flex-col md:flex-row items-center justify-between text-white">
        
        {/* Left/Center Foreground Couple Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-center md:text-left flex-1 md:pr-12 max-w-2xl"
        >
          {/* Handwritten Couple Names */}
          <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-[#FAF7F2] font-normal leading-tight drop-shadow-lg tracking-wide">
            {weddingConfig.bride.name} <span className="font-serif font-light text-4xl sm:text-5xl opacity-90 mx-1">+</span> {weddingConfig.groom.name}
          </h1>

          {/* Subtitle Label */}
          <p className="mt-4 text-xs sm:text-sm tracking-[0.35em] text-stone-300 font-medium uppercase">
            {weddingConfig.tagline}
          </p>

          {/* Decorative Divider */}
          <div className="my-6 flex items-center justify-center md:justify-start space-x-3 text-stone-300/80">
            <span className="h-px w-12 bg-white/40"></span>
            <Heart size={14} className="fill-white/80 text-white/80" />
            <span className="h-px w-12 bg-white/40"></span>
          </div>

          {/* Date and Location */}
          <p className="font-serif text-2xl sm:text-3xl font-light tracking-wider text-amber-100/90">
            {weddingConfig.mainWeddingDate.toUpperCase()}
          </p>
          <p className="mt-2 text-xs tracking-[0.25em] text-stone-300/90 font-light">
            {weddingConfig.weddingLocationShort}
          </p>
        </motion.div>

        {/* Desktop Right Side Floating Live Countdown Box */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-12 md:mt-0 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center shadow-2xl min-w-[220px]"
        >
          <div className="font-serif text-5xl sm:text-6xl font-light text-amber-100 drop-shadow">
            {daysLeft !== null ? daysLeft : "--"}
          </div>
          <div className="mt-2 text-[10px] sm:text-xs tracking-[0.25em] text-stone-200 uppercase font-medium">
            Days Left
          </div>
          <div className="mt-3 text-xs tracking-[0.15em] text-stone-300 font-serif italic">
            Until we say &quot;I do&quot; ♡
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          document.querySelector("#countdown")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-[0.3em] font-light uppercase mb-2">
          SCROLL TO BEGIN
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
