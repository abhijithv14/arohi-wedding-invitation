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
      className="fixed inset-0 z-[100] overflow-hidden bg-[#120805]"
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "linear" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/forever2.jpg"
          alt="Aparna and Rohit"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Rich brown cinematic overlay — dark enough for contrast without crushing the photo */}
      <div className="absolute inset-0 bg-[#170B07]/58" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0503]/45 via-[#24110B]/30 to-[#080302]/72" />

      {/* One centered column keeps every element on the same visual axis */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 text-center">
        <div className="flex w-full max-w-xl flex-col items-center justify-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .35, duration: .7 }}
            className="text-[9px] font-medium uppercase tracking-[.55em] text-[#D39A78]"
          >
            You are invited
          </motion.p>

          {/* Centered AR monogram */}
          <motion.div
            initial={{ opacity: 0, scale: .84, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: .55, duration: .9, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center"
            aria-label="A R monogram"
          >
            <div className="flex h-28 w-40 items-center justify-center">
              <span className="font-serif text-[88px] font-semibold leading-none tracking-[-0.16em] text-[#8A4729] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-[104px]">
                AR
              </span>
            </div>
            <span className="mt-2 block h-px w-20 bg-[#8A4729]/85" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: .8 }}
            className="mt-7 font-script text-3xl leading-none text-[#D5A080] sm:text-4xl"
          >
            to celebrate our forever
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: .8 }}
            className="mt-8 font-serif text-4xl font-light tracking-wide text-[#F0E1D8] sm:text-6xl"
          >
            <span>Aparna</span>
            <span className="mx-3 font-light text-[#A95F3A] sm:mx-5">+</span>
            <span>Rohit</span>
          </motion.h1>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: .7 }}
            onClick={openInvitation}
            className="mt-12 rounded-full border border-[#B97855]/80 bg-[#A65E3B]/90 px-8 py-3 text-[10px] font-medium tracking-[.3em] text-[#FFF4ED] shadow-2xl transition hover:scale-105 hover:bg-[#B56B45]"
          >
            OPEN INVITATION · ♫
          </motion.button>
        </div>
      </div>
    </motion.div>
  )}</AnimatePresence>;
}
