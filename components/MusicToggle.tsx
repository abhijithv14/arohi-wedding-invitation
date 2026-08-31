"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function MusicToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(weddingConfig.backgroundAudio || "/audio/background-music.mp3");
    audio.loop = true;
    audio.volume = 0.7;
    audio.preload = "auto";
    audioRef.current = audio;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;
      if (!audio || mutedRef.current || !audio.paused) return;
      audio.play().catch(() => undefined);
    };
    window.addEventListener("wedding:open", startMusic);
    return () => window.removeEventListener("wedding:open", startMusic);
  }, []);

  useEffect(() => { mutedRef.current = isMuted; }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => undefined);
    } else {
      audio.pause();
      audio.muted = true;
      mutedRef.current = true;
      setIsMuted(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button type="button" onClick={toggleMute} aria-label={isMuted ? "Play wedding music" : "Mute wedding music"} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border backdrop-blur-md transition-all ${isMuted ? "bg-white/95 text-[#3D3831] border-[#E8E3DA]" : "bg-[#6B4638] text-[#FFF5EC] border-[#D8B49D]"}`}>
        {isMuted || !isPlaying ? <VolumeX size={20} /> : <Music size={20} className="animate-pulse" />}
      </motion.button>
    </div>
  );
}
