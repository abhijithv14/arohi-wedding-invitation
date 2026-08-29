"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Train, Hotel, MapPin } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function TravelStay() {
  return (
    <section id="travel" className="py-20 bg-[#FAF7F2] border-b border-[#E8E3DA]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] font-medium text-[#8C857B] uppercase">
            FOR OUR GUESTS
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-[#2C2723] font-light">
            Travel & Accommodations
          </h2>
          <div className="w-12 h-px bg-[#D6CFB9] mx-auto mt-4" />
        </motion.div>

        {/* Travel Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Airport Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-[#E8E3DA] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#F3EFE6] flex items-center justify-center text-amber-800 mb-6">
                <Plane size={22} />
              </div>
              <h3 className="font-serif text-2xl text-[#2C2723] font-light">
                By Air
              </h3>
              <p className="mt-4 text-sm font-medium text-[#4A453E]">
                {weddingConfig.travel.nearestAirport.name}
              </p>
              <p className="mt-1 text-xs text-[#7A7469]">
                {weddingConfig.travel.nearestAirport.distance}
              </p>
            </div>
            <p className="mt-6 text-xs text-[#8C857B] italic">
              Prepaid taxis and rideshare cabs are readily available at the airport arrivals terminal.
            </p>
          </motion.div>

          {/* Railway Station Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-[#E8E3DA] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#F3EFE6] flex items-center justify-center text-amber-800 mb-6">
                <Train size={22} />
              </div>
              <h3 className="font-serif text-2xl text-[#2C2723] font-light">
                By Rail
              </h3>
              <p className="mt-4 text-sm font-medium text-[#4A453E]">
                {weddingConfig.travel.nearestRailway.name}
              </p>
              <p className="mt-1 text-xs text-[#7A7469]">
                {weddingConfig.travel.nearestRailway.distance}
              </p>
            </div>
            <p className="mt-6 text-xs text-[#8C857B] italic">
              Kazhakootam station is closest to Al Saj Hall; Trivandrum Central connects all express routes.
            </p>
          </motion.div>

          {/* Hotel Accommodations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-[#E8E3DA] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#F3EFE6] flex items-center justify-center text-amber-800 mb-6">
                <Hotel size={22} />
              </div>
              <h3 className="font-serif text-2xl text-[#2C2723] font-light">
                Where to Stay
              </h3>
              <div className="mt-4 space-y-4">
                {weddingConfig.travel.accommodations.map((hotel, idx) => (
                  <div key={idx} className="border-b border-[#F0EBE1] pb-3 last:border-none last:pb-0">
                    <p className="text-sm font-medium text-[#2C2723]">
                      {hotel.name}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-[#7A7469] mt-0.5">
                      <MapPin size={12} className="text-amber-800 shrink-0" />
                      <span>{hotel.distance} • {hotel.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
