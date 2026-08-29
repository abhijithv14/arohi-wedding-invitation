"use client";

import React from "react";
import { motion } from "framer-motion";
import { StoryMoment } from "@/config/wedding";

interface StoryGalleryProps {
  moments: StoryMoment[];
}

export default function StoryGallery({ moments }: StoryGalleryProps) {
  return (
    <div className="relative w-full py-6 flex items-center justify-center">
      {/* Grid of Rotated Polaroid Style Photos */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg w-full">
        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            className={`bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 border border-[#EAE5DC] cursor-pointer ${moment.rotation}`}
          >
            {/* Polaroid Washi Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-100/60 backdrop-blur-sm border border-amber-200/40 rotate-1 rounded-sm shadow-sm" />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-[#1A1815]">
              <img
                src={moment.image}
                alt={moment.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Handwritten Polaroid Caption */}
            <div className="pt-3 pb-1 text-center">
              <span className="font-script text-xl sm:text-2xl text-[#3D352E]">
                {moment.caption}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
