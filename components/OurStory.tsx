"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import StoryGallery from "./StoryGallery";

export default function OurStory() {
  return (
    <section id="story" className="py-24 bg-[#F5F1EA] border-b border-[#E8E3DA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs tracking-[0.3em] font-medium text-[#8C857B] uppercase">
              OUR STORY
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2723] font-light leading-tight">
              {weddingConfig.storyHeading}
            </h2>
            
            <div className="w-12 h-px bg-[#D6CFB9] my-6" />

            <p className="text-sm sm:text-base text-[#5C5549] leading-relaxed font-light">
              {weddingConfig.storyParagraph1}
            </p>
            <p className="mt-4 text-sm sm:text-base text-[#5C5549] leading-relaxed font-light">
              {weddingConfig.storyParagraph2}
            </p>

            <div className="mt-8">
              <a
                href="#gallery"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] font-semibold text-[#2C2723] hover:text-amber-800 transition-colors uppercase group"
              >
                <span>READ OUR STORY</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Polaroid Photo Collage Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 flex justify-center"
          >
            <StoryGallery moments={weddingConfig.storyMoments} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
