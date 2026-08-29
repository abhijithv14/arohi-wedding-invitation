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
        setDaysLeft(Math.ceil(difference / (1000 * 60 * 60 * 24)));
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#3B2922]"
    >
      {/* Parallax Background Photograph */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${weddingConfig.galleryPhotos[0]?.src || "/images/hero.jpg"}')` }}
      >
        {/* Warm Brown Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B16]/85 via-[#4A3028]/45 to-[#3B2922]/55" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 flex flex-col md:flex-row items-center justify-between text-white">
        
        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-center md:text-left flex-1 md:pr-12 max-w-2xl"
        >
          <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-[#F8EBDD] font-normal leading-none drop-shadow-lg tracking-wide flex flex-col items-center md:items-start">
            <span>{weddingConfig.bride.shortName}</span>
            <span className="font-serif font-light text-4xl sm:text-5xl text-[#D8A98A] opacity-95 my-1">+</span>
            <span>{weddingConfig.groom.shortName}</span>
          </h1>

          {/* Subtitle Label */}
          <p className="mt-6 text-xs sm:text-sm tracking-[0.35em] text-[#E7CDBB] font-medium uppercase">
            {weddingConfig.tagline}
          </p>

          {/* Decorative Divider */}
          <div className="my-6 flex items-center justify-center md:justify-start space-x-3 text-[#D8A98A]/80">
            <span className="h-px w-12 bg-[#D8A98A]/50"></span>
            <Heart size={14} className="fill-[#D8A98A]/80 text-[#D8A98A]" />
            <span className="h-px w-12 bg-[#D8A98A]/50"></span>
          </div>

          {/* Date and Location */}
          <p className="font-serif text-2xl sm:text-3xl font-light tracking-wider text-[#F0D4C0]">
            {weddingConfig.mainWeddingDate.toUpperCase()}
          </p>
          <p className="mt-2 text-xs tracking-[0.25em] text-[#DCC1AF] font-light">
            {weddingConfig.weddingLocationShort}
          </p>
        </motion.div>

        {/* Desktop Right Side Floating Live Countdown Box */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-12 md:mt-0 bg-[#F7E9DE]/10 backdrop-blur-md border border-[#E2B99F]/35 p-8 rounded-2xl text-center shadow-2xl min-w-[220px]"
        >
          <div className="font-serif text-5xl sm:text-6xl font-light text-[#F3D3BD] drop-shadow">
            {daysLeft !== null ? (daysLeft > 0 ? daysLeft : 0) : "--"}
          </div>
          <div className="mt-2 text-[10px] sm:text-xs tracking-[0.25em] text-[#E8D2C3] uppercase font-medium">
            {daysLeft !== null && daysLeft > 0 ? "DAYS LEFT" : "SPECIAL DAY"}
          </div>
          <div className="mt-3 text-xs tracking-[0.15em] text-[#E1C8B8] font-serif italic">
            {daysLeft !== null && daysLeft > 0
              ? "Until we start our forever ♾️"
              : "Celebrating Our Wedding Day ♡"}
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-[#E3CBBB]/75 hover:text-[#F8EBDD] transition-colors cursor-pointer"
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
