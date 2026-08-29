"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Images } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import GalleryLightbox from "./GalleryLightbox";

export default function FavoriteMoments() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const openLightbox = (index: number = 0) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section
        id="gallery"
        className="relative py-32 bg-[#1A1815] overflow-hidden flex items-center justify-center min-h-[70vh]"
      >
        {/* Parallax Background Photograph */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 bg-fixed"
          style={{ backgroundImage: `url('${weddingConfig.galleryPhotos[3]?.src || "/images/gallery-4.jpg"}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815] via-black/50 to-[#1A1815]" />
        </div>

        {/* Section Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs tracking-[0.3em] font-medium text-stone-300 uppercase">
              PHOTO GALLERY
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-tight">
              A FEW OF OUR FAVORITE MOMENTS
            </h2>

            {/* Decorative Heart Divider */}
            <div className="my-8 flex items-center justify-center space-x-3 text-stone-400">
              <span className="h-px w-12 bg-white/30"></span>
              <Heart size={14} className="fill-white/70 text-white/70" />
              <span className="h-px w-12 bg-white/30"></span>
            </div>

            {/* Gallery Thumbnail Preview Row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-2xl mx-auto my-8">
              {weddingConfig.galleryPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(idx)}
                  className="aspect-square rounded-lg overflow-hidden border border-white/20 hover:border-amber-200/80 cursor-pointer shadow-lg group transition-all"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Trigger Button */}
            <div className="mt-8">
              <button
                onClick={() => openLightbox(0)}
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full text-xs tracking-[0.2em] font-medium text-[#1A1815] bg-[#FAF7F2] hover:bg-amber-100 transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Images size={16} />
                <span>VIEW GALLERY</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        photos={weddingConfig.galleryPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </>
  );
}
