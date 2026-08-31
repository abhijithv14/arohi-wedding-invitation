"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function MusicToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(weddingConfig.backgroundAudio || "/audio/background-music.mp3");
    audio.loop = true;
    audio.volume = 0.7;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Audible autoplay is controlled by the browser. Try immediately;
    // if blocked, the first real user interaction starts the same audio.
    const tryPlay = () => {
      if (!audioRef.current || isMuted) return;
      audioRef.current.play().catch(() => undefined);
    };

    tryPlay();

    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => undefined);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Play wedding music" : "Mute wedding music"}
        title={isMuted ? "Play music" : "Mute music"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          isMuted
            ? "bg-white/95 text-[#3D3831] border-[#E8E3DA]"
            : "bg-[#3D3831] text-amber-100 border-amber-300/40 ring-2 ring-amber-300/20"
        }`}
      >
        {isMuted || !isPlaying ? (
          <VolumeX size={20} />
        ) : (
          <div className="relative flex items-center justify-center">
            <Music size={20} className="animate-pulse" />
            <Volume2 size={11} className="absolute -bottom-1 -right-1" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
