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
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: "easeInOut" }} className="fixed inset-0 z-[100] overflow-hidden bg-[#2A211D]">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 12, ease: "linear" }} className="absolute inset-0">
        <Image src="/images/forever2.jpg" alt="Aparna and Rohit" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#211814]/48" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/65" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-[#FFF8F2]">
        <div className="w-full max-w-xl px-8 py-14 sm:px-14 sm:py-16">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .7 }} className="text-[9px] tracking-[.55em] uppercase text-white/85">You are invited</motion.p>

          <motion.div initial={{ opacity: 0, scale: .84, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .55, duration: .9, ease: "easeOut" }} className="mx-auto mt-9 flex flex-col items-center" aria-label="A R monogram">
            <div className="relative h-28 w-36 sm:h-32 sm:w-40">
              <span className="absolute left-1/2 top-1/2 -translate-x-[62%] -translate-y-1/2 font-serif text-[88px] sm:text-[104px] font-light leading-none tracking-[-0.14em] text-[#E8C7B4] drop-shadow-lg">A</span>
              <span className="absolute left-1/2 top-1/2 translate-x-[1%] -translate-y-1/2 font-serif text-[88px] sm:text-[104px] font-light leading-none tracking-[-0.14em] text-[#C89A7D] drop-shadow-lg">R</span>
            </div>
            <span className="mt-1 h-px w-20 bg-[#D6AE96]/75" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: .8 }} className="mt-7 font-script text-3xl sm:text-4xl leading-none text-[#F0D6C8]">
            to celebrate our forever
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: .8 }} className="mt-8 font-serif text-4xl sm:text-6xl font-light tracking-wide text-[#FFF8F2]">
            <span>Aparna</span><span className="mx-3 sm:mx-5 text-[#D0A389] font-light">+</span><span>Rohit</span>
          </motion.h1>

          <motion.button type="button" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: .7 }} onClick={openInvitation} className="mt-12 rounded-full border border-[#F2DED2]/70 bg-[#FFF8F2]/95 px-8 py-3 text-[10px] tracking-[.3em] text-[#5D4034] shadow-2xl transition hover:scale-105 hover:bg-white">
            OPEN INVITATION · ♫
          </motion.button>
        </div>
      </div>
    </motion.div>
  )}</AnimatePresence>;
}
