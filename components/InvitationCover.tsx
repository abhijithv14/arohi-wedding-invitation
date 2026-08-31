"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface InvitationCoverProps { onOpen: () => void; }

export default function InvitationCover({ onOpen }: InvitationCoverProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const openInvitation = () => {
    window.dispatchEvent(new Event("wedding:open"));
    setVisible(false);
    onOpen();
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return <AnimatePresence>{visible && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#2A211D]"
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "linear" }}
        className="absolute inset-0"
      >
        <Image src="/images/forever2.jpg" alt="Aparna and Rohit" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#211814]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />

      {/* All cover content shares one centered axis */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 text-center text-[#FFF8F2]">
        <div className="flex w-full max-w-2xl flex-col items-center justify-center px-8 py-14 sm:px-16 sm:py-20">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .35, duration: .7 }}
            className="text-center text-[9px] font-medium uppercase tracking-[.55em] text-white/90"
          >
            You are invited
          </motion.p>

          {/* A + R monogram from the requested design, centered independently of its letter widths */}
          <motion.div
            initial={{ opacity: 0, scale: .82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .55, duration: .9, ease: "easeOut" }}
            className="relative mx-auto mt-8 h-32 w-40 sm:h-36 sm:w-44"
            aria-label="A R monogram"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-[58%] -translate-y-1/2 font-serif text-[92px] font-light leading-none tracking-[-0.16em] text-[#F3D6C4] drop-shadow-lg sm:text-[108px]">A</span>
            <span className="absolute left-1/2 top-1/2 translate-x-[2%] -translate-y-1/2 font-serif text-[92px] font-light leading-none tracking-[-0.16em] text-[#D8A98A]/95 drop-shadow-lg sm:text-[108px]">R</span>
            <span className="absolute bottom-0 left-1/2 h-px w-14 -translate-x-1/2 bg-[#E7CDBE]/70" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: .8 }}
            className="mt-6 text-center font-script text-3xl leading-none text-[#F2DED2] sm:text-4xl"
          >
            to celebrate our forever
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: .2 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.25, duration: .7 }}
            className="mx-auto mt-7 mb-7 flex w-full items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-[#D8A98A]/55" />
            <span className="text-xs text-[#E7CDBE]">♡</span>
            <span className="h-px w-10 bg-[#D8A98A]/55" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: .8 }}
            className="text-center font-serif text-4xl font-light tracking-wide text-[#FFF8F2] sm:text-6xl"
          >
            <span>Aparna</span>
            <span className="mx-3 font-light text-[#D8A98A] sm:mx-5">+</span>
            <span>Rohit</span>
          </motion.h1>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: .7 }}
            onClick={openInvitation}
            className="mt-12 rounded-full border border-[#F2DED2]/70 bg-[#FFF8F2]/95 px-8 py-3 text-[10px] tracking-[.3em] text-[#5D4034] shadow-2xl transition hover:scale-105 hover:bg-white"
          >
            OPEN INVITATION · ♫
          </motion.button>
        </div>
      </div>
    </motion.div>
  )}</AnimatePresence>;
}
