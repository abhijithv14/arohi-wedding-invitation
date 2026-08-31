"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#5A3B2E]">
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/couple1.jpg')" }}
      >
        {/* Keep the photograph bright and visible. The warm brown tint sits above
            the image instead of reducing the image opacity/brightness. */}
        <div className="absolute inset-0 bg-[#6B4636]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B3026]/10 via-[#6B4636]/14 to-[#3D2922]/28" />
        {/* Slightly stronger tint on small screens so the centered text stays crisp. */}
        <div className="absolute inset-0 bg-[#6B4636]/5 sm:hidden" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full py-20 flex flex-col items-center justify-center text-center text-[#F8EDE5]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="max-w-3xl flex flex-col items-center"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.42em] text-[#FFF4EC] font-semibold uppercase drop-shadow-[0_1px_3px_rgba(40,20,12,0.55)]">
            Together with our families
          </p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 font-script text-2xl sm:text-3xl text-[#FFE1D0] drop-shadow-[0_2px_4px_rgba(40,20,12,0.65)]"
          >
            Aparna + Rohit ♡
          </motion.p>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-6xl font-light leading-[1] tracking-wide text-[#FFF8F3] drop-shadow-[0_2px_5px_rgba(40,20,12,0.7)]">
            WE <span className="block">ARE GETTING</span><span className="block text-[#FFE0CF]">MARRIED</span>
          </h1>
          <div className="my-6 flex items-center justify-center gap-3 text-[#F2C5AD]">
            <span className="h-px w-10 bg-[#F2C5AD]/85" />
            <Heart size={13} className="fill-[#F2C5AD]/90" />
            <span className="h-px w-10 bg-[#F2C5AD]/85" />
          </div>
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#FFF1E8] font-semibold drop-shadow-[0_1px_4px_rgba(40,20,12,0.65)]">
            February 11, 2027
          </p>
          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-8 font-medium tracking-wide text-[#FFF5EF] drop-shadow-[0_1px_4px_rgba(40,20,12,0.65)]">
            We invite you to share in our joy as we begin this beautiful journey together.<br className="hidden sm:block" />Your love, blessings and presence mean the world to us.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-[#FFE2D2]/95 cursor-pointer drop-shadow-[0_1px_4px_rgba(40,20,12,0.65)]"
        onClick={() => document.querySelector("#countdown")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-[0.3em] font-light uppercase mb-2">SCROLL TO BEGIN</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
