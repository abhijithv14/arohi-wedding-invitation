"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#3B2922]">
      <motion.div initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/homecover.jpg')" }}>
        <div className="absolute inset-0 bg-[#241611]/68" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#21130F]/72 via-[#2A1813]/60 to-[#1D100C]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(24,12,8,0.38)_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full py-20 flex flex-col items-center justify-center text-center text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35 }} className="max-w-3xl flex flex-col items-center">
          <p className="text-[10px] sm:text-xs tracking-[0.42em] text-[#F7E4D9] font-medium uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">Together with our families</p>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-6 font-script text-2xl sm:text-3xl text-[#F5D8C8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">Aparna + Rohit ♡</motion.p>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-6xl font-light leading-[1] tracking-wide text-[#FFF9F5] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">WE <span className="block">ARE GETTING</span><span className="block text-[#F0C5AD]">MARRIED</span></h1>
          <div className="my-6 flex items-center justify-center gap-3 text-[#E0B39A]"><span className="h-px w-10 bg-[#E0B39A]/75" /><Heart size={13} className="fill-[#E0B39A]/90" /><span className="h-px w-10 bg-[#E0B39A]/75" /></div>
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F7E4D9] font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">February 11, 2027</p>
          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-8 font-light tracking-wide text-[#FFF3EC] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">We invite you to share in our joy as we begin this beautiful journey together.<br className="hidden sm:block" />Your love, blessings and presence mean the world to us.</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-[#E3CBBB]/90" onClick={() => document.querySelector("#countdown")?.scrollIntoView({ behavior: "smooth" })}>
        <span className="text-[10px] tracking-[0.3em] font-light uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">SCROLL TO BEGIN</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}><ChevronDown size={20} /></motion.div>
      </motion.div>
    </section>
  );
}
