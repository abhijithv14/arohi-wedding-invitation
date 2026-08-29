"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "OUR STORY", href: "#story" },
    { name: "EVENTS", href: "#events" },
    { name: "GALLERY", href: "#gallery" },
    { name: "TRAVEL & STAY", href: "#travel" },
    { name: "FAQ", href: "#faq" },
    { name: "RSVP", href: "#rsvp" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#E8E3DA]"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Initials Logo */}
          <a
            href="#home"
            className={`font-serif text-xl md:text-2xl font-light tracking-widest transition-colors ${
              scrolled ? "text-[#1F1F1F]" : "text-white"
            }`}
          >
            <span className="font-italic">{weddingConfig.bride.name[0]}</span>
            <span className="text-amber-700/80 mx-1.5 font-sans text-sm">+</span>
            <span>{weddingConfig.groom.name[0]}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs tracking-[0.2em] font-medium transition-all hover:opacity-100 ${
                  link.name === "RSVP"
                    ? scrolled
                      ? "px-5 py-2 rounded-full bg-[#3D3831] text-[#FAF7F2] hover:bg-[#2A2621]"
                      : "px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                    : scrolled
                    ? "text-[#4A453E] hover:text-[#1F1F1F]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-[#1F1F1F]" : "text-white"
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAF7F2] flex flex-col justify-center items-center px-6 md:hidden text-center"
          >
            <div className="mb-8">
              <span className="font-serif text-3xl text-[#1F1F1F] tracking-widest">
                {weddingConfig.bride.name} & {weddingConfig.groom.name}
              </span>
              <div className="flex items-center justify-center space-x-2 mt-2 text-[#7A7469]">
                <span className="h-px w-8 bg-[#D6CFB9]"></span>
                <Heart size={14} className="fill-[#7A7469]" />
                <span className="h-px w-8 bg-[#D6CFB9]"></span>
              </div>
            </div>

            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif text-2xl tracking-widest text-[#2C2723] hover:text-amber-800 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
