"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import RSVPForm from "./RSVPForm";

export default function LocationSection() {
  return (
    <section id="rsvp" className="py-24 bg-[#EFECE6] border-b border-[#E0D9CD]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* RSVP only — location details are shown with the relevant event */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          aria-label="RSVP Section"
          className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E2DDD3] shadow-sm"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
