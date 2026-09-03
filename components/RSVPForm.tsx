"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Minus, Plus, Send } from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [currentGuests, setCurrentGuests] = useState(1);
  const [updateMode, setUpdateMode] = useState(false);
  const [totalGuests, setTotalGuests] = useState<number | null>(null);

  const changeGuests = (delta: number) => {
    setGuests((value) => Math.max(1, Math.min(20, value + delta)));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setErrorMsg("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!name.trim()) return setErrorMsg("Please enter your name.");
    if (cleanPhone.length < 7 || cleanPhone.length > 15) return setErrorMsg("Please enter a valid phone number.");
    if (guests < 1) return setErrorMsg("Please select at least 1 guest.");

    setLoading(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: cleanPhone, guests, action: updateMode ? "update" : "create" }),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTotalGuests(data.totalGuests ?? null);
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#D4AF37", "#8C857B", "#F5F1EA", "#3D352E"] });
        } catch { /* decorative only */ }
      } else if (data.duplicate) {
        setDuplicate(true);
        setCurrentGuests(Number(data.currentGuests) || 1);
        setGuests(Number(data.currentGuests) || 1);
        setErrorMsg("");
      } else {
        setErrorMsg(data.error || "Failed to submit RSVP. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setDuplicate(false);
    setUpdateMode(false);
    setName("");
    setPhone("");
    setGuests(1);
    setErrorMsg("");
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/80 p-8 rounded-3xl border border-[#E8E3DA] text-center shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100"><CheckCircle2 size={32} /></div>
        <h4 className="font-serif text-2xl text-[#2C2723] font-light">{updateMode ? "RSVP Updated!" : "RSVP Received!"}</h4>
        <p className="mt-2 text-sm text-[#5C5549] max-w-sm mx-auto">With love, <span className="font-semibold text-[#2C2723]">{name}</span>. Your response has been saved.</p>
        {totalGuests !== null && <p className="mt-4 text-xs tracking-[0.18em] uppercase text-[#7A7469]">Total guests attending: <span className="font-semibold text-[#3D3831]">{totalGuests}</span></p>}
        <button type="button" onClick={reset} className="mt-6 text-xs tracking-widest text-[#7A7469] hover:text-[#2C2723] underline uppercase font-medium">Submit another response</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {errorMsg && <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2"><AlertCircle size={16} className="shrink-0 text-amber-800" /><span>{errorMsg}</span></div>}

      {duplicate ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E3DA]">
          <h4 className="font-serif text-xl text-[#3D352E]">This number is already registered.</h4>
          <p className="mt-2 text-sm text-[#5C5549]">Current guests: <span className="font-semibold">{currentGuests}</span></p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#7A7469]">Update your guest count?</p>
          <div className="mt-3 flex items-center justify-center gap-5">
            <button type="button" aria-label="Decrease guests" onClick={() => changeGuests(-1)} className="w-9 h-9 rounded-lg bg-white text-[#2C2723] flex items-center justify-center border border-[#E8E3DA] hover:bg-[#EFEBE4]"><Minus size={15} /></button>
            <span className="font-serif text-xl font-medium text-[#2C2723] w-8 text-center">{guests}</span>
            <button type="button" aria-label="Increase guests" onClick={() => changeGuests(1)} className="w-9 h-9 rounded-lg bg-white text-[#2C2723] flex items-center justify-center border border-[#E8E3DA] hover:bg-[#EFEBE4]"><Plus size={15} /></button>
          </div>
          <button type="button" onClick={() => { setUpdateMode(true); setDuplicate(false); setErrorMsg(""); }} className="mt-5 w-full py-3 rounded-xl bg-[#3D3831] text-[#FAF7F2] text-xs tracking-[0.2em] uppercase font-medium">Update RSVP</button>
          <button type="button" onClick={() => { setDuplicate(false); setErrorMsg(""); }} className="mt-3 w-full text-xs tracking-widest text-[#7A7469] underline uppercase">Back</button>
        </motion.div>
      ) : (
        <>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">Your Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E3DA] focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-sm text-[#2C2723] placeholder-[#A39C90] outline-none transition-all" />
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">Phone Number *</label>
            <input type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\-\s()]/g, ""))} placeholder="Enter phone number" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E3DA] focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-sm text-[#2C2723] placeholder-[#A39C90] outline-none transition-all" />
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-[#7A7469] font-medium mb-1">Number of Guests *</label>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E8E3DA]">
              <span className="text-xs text-[#5C5549] ml-2">People attending:</span>
              <div className="flex items-center space-x-3">
                <button type="button" aria-label="Decrease guests" onClick={() => changeGuests(-1)} className="w-8 h-8 rounded-lg bg-[#FAF7F2] hover:bg-[#EFEBE4] text-[#2C2723] flex items-center justify-center border border-[#E8E3DA]"><Minus size={14} /></button>
                <span className="font-serif text-lg font-medium text-[#2C2723] w-6 text-center">{guests}</span>
                <button type="button" aria-label="Increase guests" onClick={() => changeGuests(1)} className="w-8 h-8 rounded-lg bg-[#FAF7F2] hover:bg-[#EFEBE4] text-[#2C2723] flex items-center justify-center border border-[#E8E3DA]"><Plus size={14} /></button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 px-6 rounded-xl bg-[#3D3831] hover:bg-[#2A2621] text-[#FAF7F2] font-medium text-xs tracking-[0.2em] uppercase shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <><Loader2 size={16} className="animate-spin" /><span>{updateMode ? "UPDATING..." : "SUBMITTING..."}</span></> : <><span>{updateMode ? "UPDATE RSVP" : "CONFIRM ATTENDANCE"}</span><Send size={14} /></>}
          </button>
        </>
      )}
    </form>
  );
}
