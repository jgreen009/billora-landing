import type { SampleDocument } from "./sample-data";
import { calculateTotals, type DocumentTotals } from "./money";
import { formatCurrency, formatDate } from "./money";

export interface DocumentViewModel {
  document: SampleDocument;
  totals: DocumentTotals;
  formatted: {
    subtotal: string;
    discount: string;
    taxable: string;
    tax: string;
    total: string;
    issueDate: string;
    dueDate: string;
  };
  status: DocumentStatus;
  balanceMinor: number;
  paymentsMinor: number;
}

export type DocumentStatus =
  | "draft"
  | "issued"
  | "partial"
  | "paid"
  | "overdue"
  | "accepted"
  | "declined"
  | "expired";

export function createDocumentViewModel(
  document: SampleDocument,
  paymentsMinor = 0,
  snapshotDate?: string,
): DocumentViewModel {
  const totals = calculateTotals(
    document.items,
    document.discount,
    document.taxBasisPoints,
  );
  const balanceMinor = Math.max(0, totals.totalMinor - paymentsMinor);

  const status = deriveStatus(
    document,
    balanceMinor,
    paymentsMinor,
    snapshotDate,
  );

  return {
    document,
    totals,
    formatted: {
      subtotal: formatCurrency(totals.subtotalMinor, document.currency),
      discount: formatCurrency(totals.discountMinor, document.currency),
      taxable: formatCurrency(totals.taxableMinor, document.currency),
      tax: formatCurrency(totals.taxMinor, document.currency),
      total: formatCurrency(totals.totalMinor, document.currency),
      issueDate: formatDate(document.issueDate),
      dueDate: formatDate(document.dueOrExpiryDate),
    },
    status,
    balanceMinor,
    paymentsMinor,
  };
}

function deriveStatus(
  document: SampleDocument,
  balanceMinor: number,
  paymentsMinor: number,
  snapshotDate?: string,
): DocumentStatus {
  if (document.kind === "quote") {
    return "accepted";
  }

  if (balanceMinor <= 0) {
    return "paid";
  }

  if (paymentsMinor > 0) {
    return "partial";
  }

  if (snapshotDate && document.dueOrExpiryDate < snapshotDate) {
    return "overdue";
  }

  return "issued";
}
