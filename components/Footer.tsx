"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Share2 } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-[#121110] text-white py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 bg-fixed" style={{ backgroundImage: `url('${weddingConfig.galleryPhotos[4]?.src || "/images/footer.jpg"}')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/70 to-[#121110]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.2 }}>
          <h2 className="font-script text-5xl sm:text-6xl lg:text-7xl text-amber-100/90 font-normal leading-tight drop-shadow-md">With lots of love</h2>
          <div className="my-6 flex items-center justify-center space-x-3 text-white/50"><span className="h-px w-16 bg-white/20"></span><Heart size={16} className="fill-amber-200/80 text-amber-200/80" /><span className="h-px w-16 bg-white/20"></span></div>
          <p className="font-serif text-3xl sm:text-4xl tracking-widest text-[#FAF7F2]">Aparna <span className="text-amber-700/90 mx-2 font-sans text-xl">&amp;</span> Rohit</p>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-4 sm:space-y-0">
            <p className="font-light">© 2027 Aparna &amp; Rohit. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href={`mailto:${weddingConfig.contactEmail}`} className="hover:text-white transition-colors flex items-center space-x-1" aria-label="Email couple"><Mail size={14} /><span>Contact Us</span></a>
              <button onClick={() => { if (navigator.share) { navigator.share({ title: "Aparna & Rohit Wedding", url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); alert("Wedding invitation link copied to clipboard!"); } }} className="hover:text-white transition-colors flex items-center space-x-1"><Share2 size={14} /><span>Share Invitation</span></button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
