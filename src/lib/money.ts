import type { CurrencyCode } from "./site-config";
export type { CurrencyCode } from "./site-config";

export interface DocumentTotals {
  subtotalMinor: number;
  discountMinor: number;
  taxableMinor: number;
  taxMinor: number;
  totalMinor: number;
}

const CURRENCY_DECIMALS: Record<CurrencyCode, number> = {
  USD: 2,
  GBP: 2,
  EUR: 2,
  NGN: 2,
  CAD: 2,
  AUD: 2,
};

export function getCurrencyDecimals(currency: CurrencyCode): number {
  return CURRENCY_DECIMALS[currency] ?? 2;
}

export function roundHalfUp(value: number): number {
  return Math.round(value);
}

export function calculateLineTotal(
  quantityHundredths: number,
  unitRateMinor: number,
): number {
  const quantity = quantityHundredths / 100;
  const rate = unitRateMinor;
  const raw = quantity * rate;
  return roundHalfUp(raw);
}

export function calculateSubtotal(
  items: Array<{ quantityHundredths: number; unitRateMinor: number }>,
): number {
  return items.reduce(
    (sum, item) =>
      sum + calculateLineTotal(item.quantityHundredths, item.unitRateMinor),
    0,
  );
}

export function calculateDiscount(
  subtotalMinor: number,
  discount:
    | { type: "percentage"; basisPoints: number }
    | { type: "fixed"; amountMinor: number },
): number {
  if (discount.type === "percentage") {
    const raw = (subtotalMinor * discount.basisPoints) / 10000;
    return Math.min(roundHalfUp(raw), subtotalMinor);
  }
  return Math.min(discount.amountMinor, subtotalMinor);
}

export function calculateTax(
  taxableMinor: number,
  taxBasisPoints: number,
): number {
  const raw = (taxableMinor * taxBasisPoints) / 10000;
  return roundHalfUp(raw);
}

export function calculateTotals(
  items: Array<{ quantityHundredths: number; unitRateMinor: number }>,
  discount:
    | { type: "percentage"; basisPoints: number }
    | { type: "fixed"; amountMinor: number },
  taxBasisPoints: number,
): DocumentTotals {
  const subtotalMinor = calculateSubtotal(items);
  const discountMinor = calculateDiscount(subtotalMinor, discount);
  const taxableMinor = subtotalMinor - discountMinor;
  const taxMinor = calculateTax(taxableMinor, taxBasisPoints);
  const totalMinor = taxableMinor + taxMinor;

  return {
    subtotalMinor,
    discountMinor,
    taxableMinor,
    taxMinor,
    totalMinor,
  };
}

export function calculateBalance(
  totalMinor: number,
  paymentsMinor: number,
): number {
  const balance = totalMinor - paymentsMinor;
  return Math.max(0, balance);
}

export function formatCurrency(
  amountMinor: number,
  currency: CurrencyCode,
  locale = "en-US",
): string {
  const decimals = getCurrencyDecimals(currency);
  const amount = amountMinor / Math.pow(10, decimals);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatNumber(
  value: number,
  decimals = 2,
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  }).format(value);
}

export function formatDate(dateString: string, locale = "en-US"): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
