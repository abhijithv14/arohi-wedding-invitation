"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Plus, Minus, Send } from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<boolean>(true);
  const [guests, setGuests] = useState<number>(1);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGuestChange = (delta: number) => {
    setGuests((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, attending, guests, notes }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        // Trigger celebratory confetti on RSVP success
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#D4AF37", "#8C857B", "#F5F1EA", "#3D352E"],
          });
        } catch {
          // Ignore confetti errors if canvas unavailable
        }
      } else {
        setErrorMsg(data.error || "Failed to submit RSVP. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try submitting again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 p-8 rounded-3xl border border-[#E8E3DA] text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <CheckCircle2 size={32} />
        </div>
        <h4 className="font-serif text-2xl text-[#2C2723] font-light">
          RSVP Received!
        </h4>
        <p className="mt-2 text-sm text-[#5C5549] max-w-sm mx-auto">
          Thank you, <span className="font-semibold text-[#2C2723]">{name}</span>. We have saved your response and look forward to celebrating together.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setName("");
            setEmail("");
            setNotes("");
          }}
          className="mt-6 text-xs tracking-widest text-[#7A7469] hover:text-[#2C2723] underline uppercase font-medium"
        >
          Submit another response
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2">
          <AlertCircle size={16} className="shrink-0 text-amber-800" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">
          Your Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Madhav Nair"
          required
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E3DA] focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-sm text-[#2C2723] placeholder-[#A39C90] outline-none transition-all"
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">
          Email Address *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="madhav@example.com"
          required
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E3DA] focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-sm text-[#2C2723] placeholder-[#A39C90] outline-none transition-all"
        />
      </div>

      {/* Attendance Selection */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-2">
          Will you attend? *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium tracking-wider border transition-all ${
              attending
                ? "bg-[#3D3831] text-white border-[#3D3831] shadow-sm"
                : "bg-white text-[#5C5549] border-[#E8E3DA] hover:border-[#C5BDB2]"
            }`}
          >
            YES, I&apos;LL BE THERE
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium tracking-wider border transition-all ${
              !attending
                ? "bg-[#3D3831] text-white border-[#3D3831] shadow-sm"
                : "bg-white text-[#5C5549] border-[#E8E3DA] hover:border-[#C5BDB2]"
            }`}
          >
            SORRY, CAN&apos;T MAKE IT
          </button>
        </div>
      </div>

      {/* Guest Stepper (Only if attending) */}
      {attending && (
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">
            Number of Guests
          </label>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E8E3DA]">
            <span className="text-xs text-[#5C5549] ml-2">Total Attending:</span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleGuestChange(-1)}
                className="w-8 h-8 rounded-lg bg-[#FAF7F2] hover:bg-[#EFEBE4] text-[#2C2723] flex items-center justify-center border border-[#E8E3DA] transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-serif text-lg font-medium text-[#2C2723] w-6 text-center">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => handleGuestChange(1)}
                className="w-8 h-8 rounded-lg bg-[#FAF7F2] hover:bg-[#EFEBE4] text-[#2C2723] flex items-center justify-center border border-[#E8E3DA] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes / Dietary Requirements */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">
          Special Notes / Dietary Requirements
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any message or dietary preferences..."
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8E3DA] focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-sm text-[#2C2723] placeholder-[#A39C90] outline-none transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-[#3D3831] hover:bg-[#2A2621] text-[#FAF7F2] font-medium text-xs tracking-[0.2em] uppercase shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>SUBMITTING...</span>
          </>
        ) : (
          <>
            <span>SUBMIT RSVP</span>
            <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
}
