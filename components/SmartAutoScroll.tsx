"use client";

import { useEffect } from "react";

interface SmartAutoScrollProps {
  enabled: boolean;
}

// Gently guides inactive visitors through the main sections, but gives
// complete control back as soon as they interact with the page.
export default function SmartAutoScroll({ enabled }: SmartAutoScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const sections = ["countdown", "events", "story", "gallery"];
    let currentIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let transitionTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let scrollingAutomatically = false;

    const clearTimers = () => {
      if (timer) clearTimeout(timer);
      if (transitionTimer) clearTimeout(transitionTimer);
    };

    const stopGuidance = () => {
      if (scrollingAutomatically || cancelled) return;
      cancelled = true;
      clearTimers();
    };

    const scheduleNext = () => {
      if (cancelled || currentIndex >= sections.length) return;
      timer = setTimeout(() => {
        if (cancelled) return;

        const target = document.getElementById(sections[currentIndex]);
        if (!target) {
          currentIndex += 1;
          scheduleNext();
          return;
        }

        scrollingAutomatically = true;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        currentIndex += 1;

        // Allow the smooth scroll to finish before starting the next
        // 15-second inactivity window.
        transitionTimer = setTimeout(() => {
          scrollingAutomatically = false;
          scheduleNext();
        }, 1200);
      }, 15000);
    };

    const interactionEvents: (keyof WindowEventMap)[] = [
      "wheel",
      "touchstart",
      "touchmove",
      "pointerdown",
      "keydown",
    ];

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, stopGuidance, { passive: true })
    );

    scheduleNext();

    return () => {
      clearTimers();
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, stopGuidance)
      );
    };
  }, [enabled]);

  return null;
}
