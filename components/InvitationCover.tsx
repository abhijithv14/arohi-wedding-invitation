"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface InvitationCoverProps { onOpen: () => void; }

export default function InvitationCover({ onOpen }: InvitationCoverProps) {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    if (visible) window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const petals = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 47) % 101}%`,
    size: 6 + (i % 4) * 2,
    duration: 6 + (i % 5) * 1.4,
    delay: (i % 8) * 0.45,
    drift: -55 + (i % 11) * 11,
    rotate: -120 + (i % 8) * 35,
  })), []);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    // The click remains the single user gesture that starts the existing music.
    window.dispatchEvent(new Event("wedding:open"));
    onOpen();
    // Keep the transition layer alive long enough to blend naturally into the home page.
    window.setTimeout(() => {
      setVisible(false);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }, 5200);
  };

  return <AnimatePresence>{visible && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#2A211D]"
    >
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 12, ease: "linear" }} className="absolute inset-0">
        <Image src="/images/forever2.jpg" alt="Aparna and Rohit" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#211814]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />

      {opening && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.3, 0.12] }}
            transition={{ duration: 5.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#F2E2D7]"
          />

          {petals.map((petal, index) => (
            <motion.span
              key={index}
              initial={{ y: "-12vh", x: 0, rotate: petal.rotate, opacity: 0 }}
              animate={{
                y: "112vh",
                x: petal.drift,
                rotate: petal.rotate + 280,
                opacity: [0, 0.72, 0.82, 0.65, 0],
              }}
              transition={{ duration: petal.duration, delay: petal.delay, ease: "linear" }}
              className="absolute top-0 rounded-[70%_30%_70%_30%] bg-[#F5E7DE] shadow-[0_1px_4px_rgba(70,40,25,0.16)]"
              style={{ left: petal.left, width: petal.size, height: petal.size * 1.55 }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 18 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.88, 1, 1, 1.02], y: [18, 0, 0, -18] }}
              transition={{ duration: 2.3, times: [0, 0.2, 0.72, 1], ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="font-serif text-7xl font-light tracking-[-0.12em] text-[#704636] sm:text-8xl">AR</div>
              <span className="mt-3 h-px w-14 bg-[#9A654D]/70" />
              <div className="mt-5 font-serif text-2xl font-light tracking-wide text-[#5D4034] sm:text-3xl">Aparna + Rohit</div>
            </motion.div>
          </div>

          {/* Curtain: the original cover lifts while the petal layer continues over the reveal. */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 1.0, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 -z-10 bg-[#2A211D]"
          />
        </div>
      )}

      <motion.div
        animate={opening ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.8, delay: opening ? 0.85 : 0, ease: [0.65, 0, 0.35, 1] }}
        className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 text-center text-[#FFF8F2]"
      >
        <div className="flex w-full max-w-2xl flex-col items-center justify-center px-8 py-14 sm:px-16 sm:py-20">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .7 }} className="w-full text-center text-[9px] font-medium uppercase tracking-[.55em] text-white/90">You are invited</motion.p>
          <motion.div initial={{ opacity: 0, scale: .82 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55, duration: .9, ease: "easeOut" }} className="relative mx-auto mt-8 flex h-32 w-44 items-center justify-center sm:h-36 sm:w-48" aria-label="A R monogram">
            <div className="relative flex items-center justify-center -translate-x-1"><span className="font-serif text-[92px] font-light leading-none tracking-[-0.16em] text-[#F3D6C4] drop-shadow-lg sm:text-[108px]">A</span><span className="-ml-3 font-serif text-[92px] font-light leading-none tracking-[-0.16em] text-[#D8A98A]/95 drop-shadow-lg sm:text-[108px]">R</span></div>
            <span className="absolute bottom-0 left-1/2 h-px w-14 -translate-x-1/2 bg-[#E7CDBE]/70" />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: .8 }} className="mt-6 w-full text-center font-script text-3xl leading-none text-[#F2DED2] sm:text-4xl">to celebrate our forever</motion.p>
          <motion.div initial={{ opacity: 0, scaleX: .2 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.25, duration: .7 }} className="mx-auto mt-7 mb-7 flex w-full items-center justify-center gap-3"><span className="h-px w-10 bg-[#D8A98A]/55" /><span className="text-xs text-[#E7CDBE]">♡</span><span className="h-px w-10 bg-[#D8A98A]/55" /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: .8 }} className="w-full text-center font-serif text-4xl font-light tracking-wide text-[#FFF8F2] sm:text-6xl"><span>Aparna</span><span className="mx-3 font-light text-[#D8A98A] sm:mx-5">+</span><span>Rohit</span></motion.h1>
          <motion.button type="button" disabled={opening} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.85, duration: .7 }} onClick={openInvitation} className="mt-12 rounded-full border border-[#F2DED2]/70 bg-[#FFF8F2]/95 px-8 py-3 text-[10px] tracking-[.3em] text-[#5D4034] shadow-2xl transition hover:scale-105 hover:bg-white disabled:pointer-events-none">OPEN INVITATION · ♫</motion.button>
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>;
}
