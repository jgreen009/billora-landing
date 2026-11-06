"use client";
import { ArrowUpRight } from "lucide-react";
import { getPrimaryCTA } from "@/lib/site-config";
export function choiceKeys(
  event: React.KeyboardEvent<HTMLDivElement>,
  select: (index: number) => void,
) {
  if (
    ![
      "ArrowRight",
      "ArrowLeft",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End",
    ].includes(event.key)
  )
    return;
  const buttons = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
  );
  const index = buttons.indexOf(event.target as HTMLButtonElement);
  if (index < 0) return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : (index +
            (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
            buttons.length) %
          buttons.length;
  buttons[next].focus();
  select(next);
}
export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      className="brand"
      href="#"
      onClick={onNavigate}
      aria-label="Billora home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
      </span>
      billora<span className="brand-period">.</span>
    </a>
  );
}
export function CTA({
  children,
  href,
  secondary = false,
}: {
  children?: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  const cta = getPrimaryCTA();
  const target = href ?? cta.href;
  const resetPointer = (element: HTMLAnchorElement) => {
    element.style.removeProperty("--magnet-x");
    element.style.removeProperty("--magnet-y");
  };
  return (
    <a
      className={`b-button ${secondary ? "b-button-secondary" : ""}`}
      href={target}
      target={!href && cta.external ? "_blank" : undefined}
      rel={!href && cta.external ? "noopener noreferrer" : undefined}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          document.documentElement.dataset.motion !== "full"
        )
          return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--magnet-x",
          `${(event.clientX - bounds.left - bounds.width / 2) * 0.07}px`,
        );
        event.currentTarget.style.setProperty(
          "--magnet-y",
          `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`,
        );
      }}
      onPointerLeave={(event) => resetPointer(event.currentTarget)}
      onBlur={(event) => resetPointer(event.currentTarget)}
    >
      {children ?? cta.label}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
export function Eyebrow({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <p className="eyebrow">
      {number && <span>{number}</span>}
      {children}
    </p>
  );
}
