"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "OUR STORY", href: "#story" },
    { name: "EVENTS", href: "#events" },
    { name: "GALLERY", href: "#gallery" },
    { name: "LOCATION", href: "#rsvp" },
    { name: "RSVP", href: "#rsvp" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F7EFE7]/95 backdrop-blur-md shadow-sm py-4 border-b border-[#D9C4B5]"
          : "bg-gradient-to-b from-[#2B1B16]/70 via-[#3B2922]/20 to-transparent py-6 text-white"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className={`font-serif text-xl md:text-2xl font-light tracking-widest transition-colors ${scrolled ? "text-[#4A2F24]" : "text-[#FFF7F0]"}`}>
            <span>{weddingConfig.bride.name[0]}</span>
            <span className="text-[#B98668] mx-1.5 font-sans text-sm">+</span>
            <span>{weddingConfig.groom.name[0]}</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`text-xs tracking-[0.2em] font-medium transition-all hover:opacity-100 ${
                link.name === "RSVP"
                  ? scrolled
                    ? "px-5 py-2 rounded-full bg-[#6B4638] text-[#FFF8F2] hover:bg-[#54362B]"
                    : "px-5 py-2 rounded-full bg-[#F7E9DE]/20 hover:bg-[#F7E9DE]/30 backdrop-blur-sm border border-[#E2B99F]/40 text-white"
                  : scrolled
                  ? "text-[#6B5146] hover:text-[#4A2F24]"
                  : "text-[#FFF7F0]/85 hover:text-white"
              }`}>
                {link.name}
              </a>
            ))}
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu" className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#4A2F24]" : "text-white"}`}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-[#F7EFE7] flex flex-col justify-center items-center px-6 md:hidden text-center">
            <div className="mb-8">
              <span className="font-serif text-3xl text-[#4A2F24] tracking-widest">{weddingConfig.bride.name} & {weddingConfig.groom.name}</span>
              <div className="flex items-center justify-center space-x-2 mt-2 text-[#9A6C57]">
                <span className="h-px w-8 bg-[#D8BBAA]"></span>
                <Heart size={14} className="fill-[#9A6C57]" />
                <span className="h-px w-8 bg-[#D8BBAA]"></span>
              </div>
            </div>
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-serif text-2xl tracking-widest text-[#4A2F24] hover:text-[#8B5E4C] transition-colors">{link.name}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
