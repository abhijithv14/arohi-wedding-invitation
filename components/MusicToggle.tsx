"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function MusicToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(
      weddingConfig.backgroundAudio || "/audio/background-music.mp3"
    );
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;
    setLoaded(true);

    // Try to start the music immediately. Browsers may block audible
    // autoplay; in that case the first user interaction will start it.
    const startMusic = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {
        // Autoplay was blocked. Start after the user's first interaction.
      });
    };

    startMusic();

    const startAfterInteraction = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => undefined);
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
      window.removeEventListener("touchstart", startAfterInteraction);
    };

    window.addEventListener("pointerdown", startAfterInteraction, { once: true });
    window.addEventListener("keydown", startAfterInteraction, { once: true });
    window.addEventListener("touchstart", startAfterInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
      window.removeEventListener("touchstart", startAfterInteraction);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => undefined);
    }

    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  if (!loaded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <motion.button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute music" : "Mute music"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          isMuted
            ? "bg-white/90 text-[#3D3831] border-[#E8E3DA] hover:bg-white"
            : "bg-[#3D3831] text-amber-100 border-amber-300/40 ring-2 ring-amber-300/20"
        }`}
      >
        {isMuted ? (
          <VolumeX size={20} />
        ) : (
          <div className="relative flex items-center justify-center">
            <Music size={20} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Volume2 size={11} className="absolute -bottom-1 -right-1" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
