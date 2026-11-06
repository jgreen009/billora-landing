"use client";
import { useCallback, useSyncExternalStore } from "react";
const KEY = "billora-marketing:reduced-motion";
const EVENT = "billora:motion-change";
// Private browsing can deny storage; the control must still work for this visit.
let sessionPreference: boolean | null = null;
function snapshot() {
  if (typeof window === "undefined") return true;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    saved = sessionPreference === null ? null : String(sessionPreference);
  }
  return (
    saved === "true" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
const subscribeMounted = () => () => {};
export function useReducedMotion(): [boolean, () => void, boolean] {
  const reduced = useSyncExternalStore(subscribe, snapshot, () => true);
  const mounted = useSyncExternalStore(
    subscribeMounted,
    () => true,
    () => false,
  );
  const toggle = useCallback(() => {
    const next = !snapshot();
    try {
      localStorage.setItem(KEY, String(next));
      sessionPreference = null;
    } catch {
      sessionPreference = next;
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [reduced, toggle, mounted];
}
export const getReducedMotion = snapshot;
