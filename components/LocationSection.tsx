"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Shirt, Mail, ExternalLink, Heart } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import RSVPForm from "./RSVPForm";

export default function LocationSection() {
  const mainVenue = weddingConfig.events.find((e) => e.id === "wedding") || weddingConfig.events[0];

  const dressCodeSwatches = [
    { name: "Olive Taupe", color: "#555843" },
    { name: "Cream Beige", color: "#C5BDB2" },
    { name: "Warm Brown", color: "#7A6A5E" },
    { name: "Deep Charcoal", color: "#2B231D" },
    { name: "Midnight Navy", color: "#131E29" },
  ];

  return (
    <section id="rsvp" className="py-24 bg-[#EFECE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          
          {/* Column 1 — LOCATION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            aria-label="Location Section"
            className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E2DDD3] shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#EAE4D8] flex items-center justify-center text-amber-900">
                  <MapPin size={20} />
                </div>
                <span className="text-xs tracking-[0.25em] font-medium text-[#7A7469] uppercase">
                  LOCATION
                </span>
              </div>

              <h3 className="font-serif text-3xl text-[#2C2723] font-light">
                {mainVenue.location}
              </h3>
              <p className="mt-2 text-xs text-[#5C5549] font-light">
                {mainVenue.addressDetails || "Trivandrum, Kerala, India"}
              </p>

              {/* Map Visual Representation Box */}
              <div className="relative mt-6 h-48 w-full rounded-2xl overflow-hidden border border-[#E0D8CA] bg-[#E8E2D6] flex items-center justify-center group shadow-inner">
                {/* Visual Map Grid Pattern */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#7A7469_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent" />
                
                {/* Animated Map Marker Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <span className="mt-2 text-[10px] tracking-widest font-semibold text-[#2C2723] uppercase bg-white/90 px-3 py-1 rounded-full border border-[#DCD5C9] shadow-sm">
                    {mainVenue.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            {mainVenue.googleMapsUrl && (
              <div className="mt-8 text-center">
                <a
                  href={mainVenue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-white hover:bg-[#3D3831] text-[#2C2723] hover:text-white border border-[#D5CEC0] font-medium text-xs tracking-[0.15em] transition-all duration-300 shadow-sm"
                >
                  <span>GET DIRECTIONS</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </motion.div>

          {/* Column 2 — DRESS CODE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            aria-label="Dress Code Section"
            className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E2DDD3] shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#EAE4D8] flex items-center justify-center text-amber-900">
                  <Shirt size={20} />
                </div>
                <span className="text-xs tracking-[0.25em] font-medium text-[#7A7469] uppercase">
                  DRESS CODE
                </span>
              </div>

              <h3 className="font-serif text-3xl text-[#2C2723] font-light">
                Traditional Elegance
              </h3>

              <div className="mt-4 space-y-3 text-xs text-[#5C5549] leading-relaxed">
                <p>
                  <strong className="text-[#2C2723]">Sangeeth:</strong> Indian Ethnic Wear Only (kurta, lehenga, festive saree).
                </p>
                <p>
                  <strong className="text-[#2C2723]">Wedding & Reception:</strong> Traditional Indian / Formal Festive Attire.
                </p>
              </div>

              {/* Color Swatches */}
              <div className="mt-6">
                <span className="text-[10px] tracking-[0.2em] font-medium text-[#8C857B] uppercase block mb-3">
                  SUGGESTED COLOR PALETTE
                </span>
                <div className="flex items-center space-x-3">
                  {dressCodeSwatches.map((swatch, i) => (
                    <div
                      key={i}
                      title={swatch.name}
                      className="w-8 h-8 rounded-full border border-black/10 shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: swatch.color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Closing Quote */}
            <div className="mt-8 pt-6 border-t border-[#EAE4D8] text-center">
              <p className="font-script text-2xl text-[#5C5549]">
                &quot;We can&apos;t wait to celebrate with you!&quot;
              </p>
              <Heart size={14} className="fill-amber-800 text-amber-800 mx-auto mt-2 opacity-80" />
            </div>
          </motion.div>

          {/* Column 3 — RSVP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            aria-label="RSVP Section"
            className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E2DDD3] shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#EAE4D8] flex items-center justify-center text-amber-900">
                  <Mail size={20} />
                </div>
                <span className="text-xs tracking-[0.25em] font-medium text-[#7A7469] uppercase">
                  RSVP
                </span>
              </div>

              <h3 className="font-serif text-3xl text-[#2C2723] font-light">
                Join Our Celebration
              </h3>
              <p className="mt-1 text-xs text-[#7A7469] mb-6">
                Kindly reply by <span className="font-semibold text-[#2C2723]">{weddingConfig.rsvpDeadline}</span>.
              </p>

              <RSVPForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
