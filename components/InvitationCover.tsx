"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";

interface InvitationCoverProps { onOpen: () => void; }

export default function InvitationCover({ onOpen }: InvitationCoverProps) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const openInvitation = () => {
    setVisible(false);
    onOpen();
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return <AnimatePresence>{visible && (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="fixed inset-0 z-[100] overflow-hidden bg-[#2A211D]">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 12, ease: "linear" }} className="absolute inset-0">
        <Image src={"/images/couple1.jpg"} alt="Aparna and Rohit" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#211814]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-[#FFF8F2]">
        <div className="w-full max-w-2xl border border-white/35 px-8 py-14 sm:px-16 sm:py-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }} className="text-[9px] tracking-[.55em] uppercase">You are invited</motion.p>
          <motion.div initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .65, duration: .8 }} className="my-7 font-serif text-4xl sm:text-5xl tracking-[.08em]">A + R</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }} className="font-serif text-4xl sm:text-6xl font-light">Aparna <span className="text-[#E7CDBE]">+</span> Rohit</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }} className="mt-5 font-script text-2xl sm:text-3xl text-[#F2DED2]">to celebrate our forever</motion.p>
          <div className="mx-auto my-7 h-px w-16 bg-[#E7CDBE]/70" />
          <p className="text-[10px] tracking-[.32em] uppercase text-white/85">{weddingConfig.mainWeddingDate} · Kerala</p>
          <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} onClick={openInvitation} className="mt-10 rounded-full border border-[#F2DED2]/70 bg-[#FFF8F2]/95 px-8 py-3 text-[10px] tracking-[.3em] text-[#5D4034] shadow-2xl hover:bg-white hover:scale-105 transition">OPEN INVITATION · ♫</motion.button>
          <p className="mt-5 text-[9px] tracking-[.18em] text-white/65">Tap to enter & start the music</p>
        </div>
      </div>
    </motion.div>
  )}</AnimatePresence>;
}
