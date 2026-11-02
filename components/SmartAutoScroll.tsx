"use client";

import { useEffect } from "react";

interface SmartAutoScrollProps {
  enabled: boolean;
}

// Guides inactive visitors through the invitation. Any intentional input
// cancels the guide permanently so manual browsing always takes priority.
export default function SmartAutoScroll({ enabled }: SmartAutoScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const sections = ["countdown", "events", "story", "gallery"];
    const delayMs = 15_000;
    let currentIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let transitionTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let scrollingAutomatically = false;

    const clearTimers = () => {
      if (timer !== undefined) clearTimeout(timer);
      if (transitionTimer !== undefined) clearTimeout(transitionTimer);
      timer = undefined;
      transitionTimer = undefined;
    };

    const stopGuidance = () => {
      if (scrollingAutomatically || cancelled) return;
      cancelled = true;
      clearTimers();
    };

    const isUsingProtectedArea = () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest("#rsvp, form")) {
        return true;
      }

      return Boolean(
        document.querySelector(
          'header button[aria-expanded="true"], header [role="menu"]'
        )
      );
    };

    const scheduleNext = () => {
      if (cancelled || currentIndex >= sections.length) return;

      timer = setTimeout(() => {
        timer = undefined;
        if (cancelled) return;

        // Never take the visitor past an open menu or an active RSVP form.
        if (document.hidden || isUsingProtectedArea()) {
          stopGuidance();
          return;
        }

        const target = document.getElementById(sections[currentIndex]);
        if (!target) {
          currentIndex += 1;
          scheduleNext();
          return;
        }

        scrollingAutomatically = true;
        const top = Math.max(
          0,
          window.scrollY + target.getBoundingClientRect().top - 76
        );
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
          top,
          behavior: reducedMotion ? "auto" : "smooth",
        });
        currentIndex += 1;

        // Start the next 15-second wait only after this section transition.
        transitionTimer = setTimeout(() => {
          transitionTimer = undefined;
          scrollingAutomatically = false;
          scheduleNext();
        }, reducedMotion ? 100 : 1_200);
      }, delayMs);
    };

    const interactionEvents: (keyof WindowEventMap)[] = [
      "wheel",
      "touchstart",
      "touchmove",
      "pointerdown",
      "keydown",
      "focusin",
    ];

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, stopGuidance, { passive: true })
    );

    const handleVisibilityChange = () => {
      if (document.hidden) stopGuidance();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    scheduleNext();

    return () => {
      clearTimers();
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, stopGuidance)
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  return null;
}
