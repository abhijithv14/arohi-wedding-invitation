"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lazy load audio instance client-side
    const audio = new Audio(weddingConfig.backgroundAudio || "/audio/background-music.mp3");
    audio.loop = true;
    audioRef.current = audio;
    setLoaded(true);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback error:", err);
        });
    }
  };

  if (!loaded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <motion.button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? "bg-[#3D3831] text-amber-100 border-amber-300/40 ring-2 ring-amber-300/20"
            : "bg-white/90 text-[#3D3831] border-[#E8E3DA] hover:bg-white"
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Music size={20} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </motion.button>
    </div>
  );
}
