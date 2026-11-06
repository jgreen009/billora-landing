"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let activeScroller: Lenis | null = null;
const navigationEase = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Keep button-driven workflow navigation on the same clock as wheel scrolling. */
export function scrollToElement(element: Element | null, reduced: boolean) {
  if (!element) return;
  if (activeScroller && !reduced) {
    const rect = element.getBoundingClientRect();
    activeScroller.scrollTo(window.scrollY + rect.top - (window.innerHeight - rect.height) / 2, {
      duration: 1.65,
      easing: navigationEase,
    });
  } else {
    element.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  }
}

export function useSmoothScroll(reduced: boolean, paused: boolean) {
  const instance = useRef<Lenis | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    let destroy: (() => void) | undefined;
    const setup = () => {
      destroy?.();
      destroy = undefined;
      document.documentElement.dataset.scroll = "native";
      if (reduced || !media.matches) return;

      const scroller = new Lenis({
        wheelMultiplier: 0.58,
        lerp: 0.065,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: false,
        overscroll: false,
        // A single high-delta mouse notch should not skip an entire scene.
        virtualScroll: (data) => {
          data.deltaY = Math.max(-220, Math.min(220, data.deltaY));
          return true;
        },
        prevent: (node) => node.hasAttribute("data-lenis-prevent"),
      });
      instance.current = activeScroller = scroller;
      document.documentElement.dataset.scroll = "smooth";
      if (pausedRef.current) scroller.stop();
      const update = () => ScrollTrigger.update();
      const tick = (time: number) => scroller.raf(time * 1000);
      scroller.on("scroll", update);
      gsap.ticker.add(tick);
      let disposed = false;
      const cancelInertia = (event: KeyboardEvent) => {
        if (!pausedRef.current && ["Tab", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
          scroller.scrollTo(window.scrollY, { immediate: true });
        }
      };
      document.addEventListener("keydown", cancelInertia);

      const navigate = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
        const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        // Preserve the browser's immediate keyboard skip-to-content behavior.
        if (!anchor || anchor.classList.contains("skip-link") || anchor.hasAttribute("download")) return;
        const hash = anchor.getAttribute("href") || "#";
        let target: HTMLElement | null;
        try {
          target = hash === "#"
            ? document.documentElement
            : document.getElementById(decodeURIComponent(hash.slice(1)));
        } catch {
          return;
        }
        if (!target) return;
        event.preventDefault();
        if (window.location.hash !== hash) window.history.pushState(null, "", hash);
        // React closes the menu and releases its scroll lock before this frame.
        requestAnimationFrame(() => {
          if (disposed) return;
          scroller.start();
          scroller.scrollTo(hash === "#" ? 0 : target, {
            duration: 1.65,
            easing: navigationEase,
            onComplete: () => {
              if (event.detail !== 0 || !target) return;
              const temporary = !target.hasAttribute("tabindex");
              if (temporary) target.setAttribute("tabindex", "-1");
              target.focus({ preventScroll: true });
              if (temporary) target.addEventListener("blur", () => target?.removeAttribute("tabindex"), { once: true });
            },
          });
        });
      };
      document.addEventListener("click", navigate);
      destroy = () => {
        disposed = true;
        document.removeEventListener("click", navigate);
        document.removeEventListener("keydown", cancelInertia);
        gsap.ticker.remove(tick);
        scroller.off("scroll", update);
        scroller.destroy();
        if (activeScroller === scroller) activeScroller = null;
        instance.current = null;
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      media.removeEventListener("change", setup);
      destroy?.();
      document.documentElement.dataset.scroll = "native";
    };
  }, [reduced]);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) instance.current?.stop();
    else instance.current?.start();
  }, [paused, reduced]);
}
