"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import EventCard from "./EventCard";

export default function Events() {
  return (
    <section id="events" className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] font-medium text-[#8C857B] uppercase">
            CELEBRATE WITH US
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-[#2C2723] font-light">
            Wedding Events
          </h2>
          <div className="w-12 h-px bg-[#D6CFB9] mx-auto mt-4" />
        </motion.div>

        {/* 3 Event Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {weddingConfig.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
