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
        style={{ backgroundImage: "url('/images/homecover.jpg')" }}
      >
        {/* Light warm-brown tint: keeps the photograph visible while giving the text a clean backdrop. */}
        <div className="absolute inset-0 bg-[#6B4636]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B3026]/15 via-[#6B4636]/18 to-[#3D2922]/32" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full py-20 flex flex-col items-center justify-center text-center text-[#FFF8F0]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="max-w-3xl flex flex-col items-center"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.42em] text-[#FFF1E7] font-semibold uppercase drop-shadow-sm">Together with our families</p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 font-script text-2xl sm:text-3xl text-[#FFE2D2] drop-shadow-sm"
          >
            Aparna + Rohit ♡
          </motion.p>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-6xl font-light leading-[1] tracking-wide text-white drop-shadow-md">
            WE <span className="block">ARE GETTING</span><span className="block text-[#FFE0CF]">MARRIED</span>
          </h1>
          <div className="my-6 flex items-center justify-center gap-3 text-[#FFD1B9]">
            <span className="h-px w-10 bg-[#FFD1B9]/80" />
            <Heart size={13} className="fill-[#FFD1B9]/85" />
            <span className="h-px w-10 bg-[#FFD1B9]/80" />
          </div>
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#FFF1E7] font-semibold drop-shadow-sm">February 11, 2027</p>
          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-8 font-medium tracking-wide text-[#FFF5EE] drop-shadow-sm">
            We invite you to share in our joy as we begin this beautiful journey together.<br className="hidden sm:block" />Your love, blessings and presence mean the world to us.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-[#FFE2D2]/95 cursor-pointer"
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
