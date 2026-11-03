"use client";

import { useEffect, useState } from "react";

interface SmartAutoScrollProps {
  enabled: boolean;
}

const IOS_PROMPT_KEY = "arohi-ios-scroll-prompt-shown";

export default function SmartAutoScroll({ enabled }: SmartAutoScrollProps) {
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setShowIOSPrompt(false);
      return;
    }

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // iPhone/iPad: never move the page automatically. Prompt once if the
    // visitor has not scrolled within six seconds after opening the cover.
    if (isIOS) {
      let hasScrolled = false;
      let promptTimer: ReturnType<typeof setTimeout> | undefined;

      try {
        if (window.sessionStorage.getItem(IOS_PROMPT_KEY) === "true") {
          return;
        }
      } catch {
        // Continue for browsers where sessionStorage is unavailable.
      }

      const markPromptHandled = () => {
        try {
          window.sessionStorage.setItem(IOS_PROMPT_KEY, "true");
        } catch {
          // The in-memory flag still prevents repeat prompts this visit.
        }
      };

      const handleScroll = () => {
        hasScrolled = true;
        markPromptHandled();
        setShowIOSPrompt(false);
        if (promptTimer !== undefined) {
          clearTimeout(promptTimer);
          promptTimer = undefined;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      promptTimer = setTimeout(() => {
        promptTimer = undefined;
        if (!hasScrolled && !document.hidden) {
          markPromptHandled();
          setShowIOSPrompt(true);
        }
      }, 6_000);

      const handleVisibilityChange = () => {
        if (document.hidden && promptTimer !== undefined) {
          clearTimeout(promptTimer);
          promptTimer = undefined;
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        if (promptTimer !== undefined) clearTimeout(promptTimer);
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    // Keep the existing gentle auto-scroll behaviour for desktop and Android.
    const idleDelayMs = 6_500;
    const pixelsPerSecond = 32;
    const mobilePixelsPerSecond = 60;
    const scrollSpeed = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)"
    ).matches
      ? mobilePixelsPerSecond
      : pixelsPerSecond;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let autoScrolling = false;
    let destroyed = false;
    const scrollRoot = (document.scrollingElement ??
      document.documentElement) as HTMLElement;
    const originalScrollBehavior = scrollRoot.style.scrollBehavior;

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
      scrollRoot.style.scrollBehavior = originalScrollBehavior;
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
      const deltaSeconds = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
      lastFrameTime = timestamp;

      const currentScroll = scrollRoot.scrollTop;
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

      scrollRoot.scrollTop = Math.min(
        maxScroll,
        currentScroll + scrollSpeed * deltaSeconds
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
          scrollRoot.style.scrollBehavior = "auto";
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

  if (!showIOSPrompt) return null;

  return (
    <div className="fixed inset-x-4 bottom-6 z-[100] flex justify-center px-2 pb-[env(safe-area-inset-bottom)]">
      <div
        role="status"
        aria-live="polite"
        className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-rose-200/70 bg-white/95 px-4 py-3 text-center shadow-[0_12px_40px_rgba(80,35,45,0.18)] backdrop-blur-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xl text-rose-600">
          ♥
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-sm font-semibold text-rose-950">
            There&apos;s more to explore
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-stone-600">
            Swipe up to discover their beautiful wedding moments.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowIOSPrompt(false)}
          className="shrink-0 rounded-full px-2 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          aria-label="Dismiss scroll reminder"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
