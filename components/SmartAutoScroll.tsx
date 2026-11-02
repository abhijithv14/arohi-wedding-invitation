"use client";

import { useEffect } from "react";

interface SmartAutoScrollProps {
  enabled: boolean;
}

// Slowly moves the invitation upward after 8 seconds without visitor input.
// Manual interaction pauses the motion and starts a fresh idle countdown.
export default function SmartAutoScroll({ enabled }: SmartAutoScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const idleDelayMs = 8_000;
    const pixelsPerSecond = 18;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let autoScrolling = false;
    let destroyed = false;

    const isUsingProtectedArea = () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest("#rsvp, #rsvp form")) {
        return true;
      }

      return Boolean(
        document.querySelector(
          'header button[aria-expanded="true"], header [role="menu"], .mobile-menu-open'
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

      const scrollRoot = document.scrollingElement ?? document.documentElement;
      const maxScroll = Math.max(0, scrollRoot.scrollHeight - window.innerHeight);

      if (scrollRoot.scrollTop >= maxScroll - 1) {
        stopAnimation();
        return;
      }

      // Set the scrolling element directly so the motion works consistently
      // across browsers even when CSS smooth scrolling is enabled.
      scrollRoot.scrollTop = Math.min(
        maxScroll,
        scrollRoot.scrollTop + pixelsPerSecond * deltaSeconds
      );

      animationFrame = requestAnimationFrame(animateScroll);
    };

    const scheduleIdleStart = () => {
      if (destroyed) return;
      if (idleTimer !== undefined) clearTimeout(idleTimer);

      idleTimer = setTimeout(() => {
        idleTimer = undefined;
        if (destroyed || document.hidden) return;

        if (isUsingProtectedArea()) {
          scheduleIdleStart();
          return;
        }

        if (!autoScrolling) {
          autoScrolling = true;
          lastFrameTime = 0;
          animationFrame = requestAnimationFrame(animateScroll);
        }
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

    const handleFocusIn = () => {
      if (isUsingProtectedArea()) {
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

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        if (idleTimer !== undefined) clearTimeout(idleTimer);
        idleTimer = undefined;
      } else {
        scheduleIdleStart();
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);

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
