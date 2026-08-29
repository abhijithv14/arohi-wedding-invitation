"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryPhoto } from "@/config/wedding";

interface GalleryLightboxProps {
  isOpen: boolean;
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  isOpen,
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 select-none"
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between text-white/80 max-w-7xl z-10">
          <span className="font-serif text-sm tracking-widest text-white/60">
            {currentIndex + 1} / {photos.length}
          </span>

          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Image View */}
        <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-4 overflow-hidden">
          {/* Navigation Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-sm border border-white/10 transition-colors"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Active Photo */}
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-h-[75vh] max-w-full flex flex-col items-center justify-center"
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </motion.div>

          {/* Navigation Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-sm border border-white/10 transition-colors"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Bottom Caption Bar */}
        <div className="text-center max-w-xl text-white/90 mb-4">
          <h4 className="font-serif text-xl sm:text-2xl font-light text-amber-100">
            {currentPhoto.title}
          </h4>
          {currentPhoto.caption && (
            <p className="mt-1 text-xs text-stone-400 font-light">
              {currentPhoto.caption}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
