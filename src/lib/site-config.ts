export const siteConfig = {
  name: "Billora",
  tagline: "Great work deserves better billing.",
  description:
    "Explore a considered billing workspace for independent professionals. An interactive portfolio concept for quotes, invoices, and payment records.",
};

// This portfolio stays self-contained; no signup or external account is implied.
export function getPrimaryCTA() {
  return {
    label: "Explore the product",
    href: "#workflow",
    external: false,
  } as const;
}
export type CurrencyCode = "USD" | "GBP" | "EUR" | "NGN" | "CAD" | "AUD";
export type DocumentTemplate = "minimal" | "modern" | "professional";
