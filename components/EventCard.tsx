"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Wine, MapPin, ExternalLink } from "lucide-react";
import { WeddingEvent } from "@/config/wedding";

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  // Compute weekday dynamically from event.date string (e.g. "2026-02-09" -> "Monday")
  const getDynamicWeekday = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString("en-US", { weekday: "long" });
    } catch {
      return "";
    }
  };

  const formattedDateString = () => {
    try {
      const [year, month, day] = event.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const monthName = date.toLocaleDateString("en-US", { month: "long" });
      const weekday = getDynamicWeekday(event.date);
      return `${weekday}, ${monthName} ${day}, ${year}`;
    } catch {
      return event.date;
    }
  };

  const getIcon = () => {
    switch (event.iconName) {
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-amber-800" />;
      case "ring":
        return <Heart className="w-6 h-6 text-amber-800 fill-amber-800/20" />;
      case "glass":
        return <Wine className="w-6 h-6 text-amber-800" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-800" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-[#E8E3DA] transition-all duration-300 flex flex-col h-full group"
    >
      {/* Event Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-[#2A2621]">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Circular Icon Badge Overlapping Image Bottom */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#FAF7F2] border-2 border-white shadow-md flex items-center justify-center z-10">
          {getIcon()}
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-10 pb-8 px-6 text-center flex-1 flex flex-col justify-between items-center bg-gradient-to-b from-[#FAF7F2]/50 to-white">
        <div>
          {/* Event Title */}
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2723] font-light">
            {event.name}
          </h3>

          {/* Dynamic Date & Weekday */}
          <p className="mt-2 text-xs tracking-[0.2em] font-medium text-amber-900 uppercase">
            {formattedDateString()}
          </p>

          {/* Time & Muhurtham */}
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-[#F3EFE6] border border-[#E4DDD0] text-xs text-[#5C5549] font-medium">
            {event.time}
            {event.muhurthamTime && (
              <span className="block text-[11px] text-amber-900 font-semibold mt-0.5">
                Muhurtham: {event.muhurthamTime}
              </span>
            )}
          </div>

          {/* Location Info */}
          <div className="mt-5 flex items-center justify-center space-x-2 text-sm text-[#4A453E]">
            <MapPin size={16} className="text-amber-800 shrink-0" />
            <span className="font-medium">{event.location}</span>
          </div>
          {event.addressDetails && (
            <p className="mt-1 text-xs text-[#7A7469] max-w-xs mx-auto">
              {event.addressDetails}
            </p>
          )}

          {/* Dress Code */}
          <p className="mt-4 text-xs tracking-wider text-[#665F55] italic">
            <span className="font-semibold non-italic">Dress Code:</span> {event.dressCode}
          </p>
        </div>

        {/* Action Button */}
        {event.googleMapsUrl && (
          <div className="mt-8">
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs tracking-[0.15em] font-medium text-[#2C2723] bg-[#EFEBE4] hover:bg-[#2C2723] hover:text-white border border-[#DCD5C9] transition-all duration-300 shadow-sm"
            >
              <span>VIEW LOCATION</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
