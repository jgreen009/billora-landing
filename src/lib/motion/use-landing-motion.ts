"use client";
import {
  useEffect,
  useRef,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function useLandingMotion(
  root: RefObject<HTMLDivElement | null>,
  reduced: boolean,
  setStep: Dispatch<SetStateAction<number>>,
) {
  const introPlayed = useRef(false);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      // Play the opening once, rather than replaying it when motion is re-enabled.
      if (!introPlayed.current && window.scrollY < window.innerHeight / 2) {
        const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
        opening
          .fromTo(".b-nav > .brand", { y: -22, opacity: 0.2 }, { y: 0, opacity: 1, duration: 1.15 }, 0.05)
          .fromTo(".b-nav .brand-symbol i", { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 1.1, stagger: 0.14 }, 0.15)
          .fromTo(".desktop-nav > a", { y: -18, opacity: 0.15 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.15 }, 0.25)
          .fromTo(".nav-end > *", { y: -16, opacity: 0.15 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.13 }, 0.45)
          .fromTo(".hero-line > span", { yPercent: 110 }, { yPercent: 0, duration: 1.65, stagger: 0.18 }, 0.2)
          .fromTo(".hero-intro > .eyebrow, .hero-description, .hero-actions, .hero-footnote", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.16 }, 0.5)
          .fromTo(".hero-spark", { rotation: -35, scale: 0.5 }, { rotation: 10, scale: 1, duration: 1.6, ease: "power2.out" }, 0.9)
          .fromTo(".workspace-caption", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15 }, 0.85)
          .fromTo(".hero-workspace", { y: 90, opacity: 0.35 }, { y: 0, opacity: 1, duration: 1.85 }, 0.65)
          .fromTo(".payment-float", { y: 28, scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.15, ease: "back.out(1.1)" }, 1.65);
      }
      introPlayed.current = true;
      const featureCards = gsap.utils.toArray<HTMLElement>(".feature-bento > [data-reveal]");
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 64, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            duration: 1.35,
            delay: featureCards.includes(el) ? (featureCards.indexOf(el) % 3) * 0.16 : 0,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        gsap.fromTo(
          ".hero-workspace",
          { rotateX: 7, scale: 0.96 },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-workspace",
              start: "top 90%",
              end: "center 50%",
              scrub: 1.4,
            },
          },
        );
        gsap.to(".hero-orbit", {
          y: -100,
          rotation: 25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
        gsap.utils.toArray<HTMLElement>(".story-step").forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setStep(i),
            onEnterBack: () => setStep(i),
          }),
        );
        gsap.to(".sculpture-image", {
          yPercent: -12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
        gsap.fromTo(
          ".balance-bar i",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            ease: "power2.out",
            duration: 1.9,
            scrollTrigger: {
              trigger: ".balance-art",
              start: "top 85%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          ".client-preview",
          { y: 35, rotation: 0 },
          {
            y: 0,
            rotation: (i) => [-3, 2, -1][i],
            stagger: 0.2,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".client-stack",
              start: "top 85%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          ".workspace-chart .chart-line",
          { strokeDasharray: 700, strokeDashoffset: 700 },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".workspace-chart",
              start: "top 90%",
              once: true,
            },
          },
        );
      });
      gsap.fromTo(
        ".reading-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced, root, setStep]);
}
