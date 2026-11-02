"use client";

import { useEffect } from "react";

interface SmartAutoScrollProps {
  enabled: boolean;
}

// Slowly moves the invitation upward after the cover closes and the visitor is idle.
// Manual interaction pauses the motion and starts a fresh idle countdown.
export default function SmartAutoScroll({ enabled }: SmartAutoScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const idleDelayMs = 6_500;
    const pixelsPerSecond = 32;
    const mobilePixelsPerSecond = 60;
    const scrollSpeed = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
      ? mobilePixelsPerSecond
      : pixelsPerSecond;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let autoScrolling = false;
    let destroyed = false;
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;

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
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
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
      const currentScroll = Math.max(
        window.scrollY,
        scrollRoot.scrollTop,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      const documentHeight = Math.max(
        scrollRoot.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const maxScroll = Math.max(0, documentHeight - window.innerHeight);

      if (currentScroll >= maxScroll - 1) {
        stopAnimation();
        return;
      }

      // Use instant frame-by-frame movement for stable constant-speed scrolling,
      // including on iOS Safari.
      const nextScroll = Math.min(
        maxScroll,
        currentScroll + scrollSpeed * deltaSeconds
      );
      window.scrollTo({ left: 0, top: nextScroll, behavior: "auto" });
      scrollRoot.scrollTop = nextScroll;

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
          // Override the site's `scroll-smooth` class; smooth scrolling on every
          // animation frame prevents reliable constant-speed movement in Safari.
          document.documentElement.style.scrollBehavior = "auto";
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
