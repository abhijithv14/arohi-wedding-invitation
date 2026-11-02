"use client";

import { useEffect } from "react";

interface SmartAutoScrollProps {
  enabled: boolean;
}

// After 15 seconds without input, slowly moves the page upward.
// Any visitor interaction pauses it; another idle period can resume it.
export default function SmartAutoScroll({ enabled }: SmartAutoScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const idleDelayMs = 15_000;
    const pixelsPerSecond = 10;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let autoScrolling = false;
    let destroyed = false;

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

    const stopAnimation = () => {
      autoScrolling = false;
      lastFrameTime = 0;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const animateScroll = (timestamp: number) => {
      if (destroyed || !autoScrolling) return;

      if (document.hidden || isUsingProtectedArea()) {
        stopAnimation();
        return;
      }

      if (lastFrameTime === 0) lastFrameTime = timestamp;
      const deltaSeconds = Math.min((timestamp - lastFrameTime) / 1000, 0.05);
      lastFrameTime = timestamp;

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      if (window.scrollY >= maxScroll - 1) {
        stopAnimation();
        return;
      }

      window.scrollBy(0, pixelsPerSecond * deltaSeconds);
      animationFrame = requestAnimationFrame(animateScroll);
    };

    const startAnimation = () => {
      if (destroyed || autoScrolling || document.hidden) return;
      if (isUsingProtectedArea()) {
        scheduleIdleStart();
        return;
      }

      autoScrolling = true;
      lastFrameTime = 0;
      animationFrame = requestAnimationFrame(animateScroll);
    };

    const scheduleIdleStart = () => {
      if (destroyed) return;
      if (idleTimer !== undefined) clearTimeout(idleTimer);

      idleTimer = setTimeout(() => {
        idleTimer = undefined;
        startAnimation();
      }, idleDelayMs);
    };

    const handleVisitorActivity = () => {
      stopAnimation();
      scheduleIdleStart();
    };

    const interactionEvents: (keyof WindowEventMap)[] = [
      "wheel",
      "touchstart",
      "touchmove",
      "pointerdown",
      "keydown",
    ];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleVisitorActivity, {
        passive: true,
      });
    });

    // If focus enters RSVP, pause; when focus leaves, begin a fresh idle wait.
    const handleFocusIn = () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest("#rsvp, form")) {
        stopAnimation();
        if (idleTimer !== undefined) clearTimeout(idleTimer);
        idleTimer = undefined;
      } else {
        handleVisitorActivity();
      }
    };
    const handleFocusOut = () => {
      window.setTimeout(() => {
        if (!isUsingProtectedArea()) scheduleIdleStart();
      }, 0);
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        if (idleTimer !== undefined) clearTimeout(idleTimer);
        idleTimer = undefined;
      } else {
        scheduleIdleStart();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Do not auto-scroll while a menu is already open when the page activates.
    scheduleIdleStart();

    return () => {
      destroyed = true;
      stopAnimation();
      if (idleTimer !== undefined) clearTimeout(idleTimer);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleVisitorActivity);
      });
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  return null;
}
