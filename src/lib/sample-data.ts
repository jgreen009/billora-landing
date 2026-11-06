import type { CurrencyCode, DocumentTemplate } from "./site-config";

export interface PartySnapshot {
  name: string;
  contact?: string;
  email: string;
}

export interface SampleLineItem {
  id: string;
  description: string;
  quantityHundredths: number;
  unitRateMinor: number;
}

export interface SampleDocument {
  kind: "quote" | "invoice";
  number: string;
  currency: CurrencyCode;
  issuer: PartySnapshot;
  client: PartySnapshot;
  issueDate: string;
  dueOrExpiryDate: string;
  items: SampleLineItem[];
  discount: Discount;
  taxBasisPoints: number;
  template: DocumentTemplate;
  notes: string;
  isSample: true;
}

export type Discount =
  | { type: "percentage"; basisPoints: number }
  | { type: "fixed"; amountMinor: number };

export const ISSUER: PartySnapshot = {
  name: "Billora Studio",
  email: "billing@billorastudio.example",
};

export const CLIENT: PartySnapshot = {
  name: "Atlas Creative",
  contact: "Sarah Miller",
  email: "accounts@atlascreative.example",
};

export const ADDITIONAL_CLIENTS: PartySnapshot[] = [
  { name: "Northstar Builders", email: "billing@northstarbuilders.example" },
  { name: "Pixelhouse Studio", email: "accounts@pixelhousestudio.example" },
  { name: "Nexus Labs", email: "finance@nexuslabs.example" },
  { name: "Mason & Co.", email: "billing@masonco.example" },
];

export const SAMPLE_ITEMS: SampleLineItem[] = [
  {
    id: "item-1",
    description: "Website design",
    quantityHundredths: 100,
    unitRateMinor: 250000,
  },
  {
    id: "item-2",
    description: "Frontend development",
    quantityHundredths: 4000,
    unitRateMinor: 7500,
  },
  {
    id: "item-3",
    description: "CMS integration",
    quantityHundredths: 100,
    unitRateMinor: 80000,
  },
];

export const SAMPLE_DISCOUNT: Discount = {
  type: "percentage",
  basisPoints: 1000,
};
export const SAMPLE_TAX_BASIS_POINTS = 800;

export const SAMPLE_QUOTE: SampleDocument = {
  kind: "quote",
  number: "QT-0018",
  currency: "USD",
  issuer: ISSUER,
  client: CLIENT,
  issueDate: "2026-09-18",
  dueOrExpiryDate: "2026-10-02",
  items: SAMPLE_ITEMS,
  discount: SAMPLE_DISCOUNT,
  taxBasisPoints: SAMPLE_TAX_BASIS_POINTS,
  template: "modern",
  notes:
    "Quote for website redesign project. Valid for 14 days from issue date.",
  isSample: true,
};

export const SAMPLE_INVOICE: SampleDocument = {
  kind: "invoice",
  number: "INV-0032",
  currency: "USD",
  issuer: ISSUER,
  client: CLIENT,
  issueDate: "2026-09-22",
  dueOrExpiryDate: "2026-10-06",
  items: SAMPLE_ITEMS,
  discount: SAMPLE_DISCOUNT,
  taxBasisPoints: SAMPLE_TAX_BASIS_POINTS,
  template: "modern",
  notes: "Invoice for website redesign project. Payment terms: Net 14.",
  isSample: true,
};

export const WALKTHROUGH_PAYMENT_MINOR = 200000;
export const WALKTHROUGH_SNAPSHOT_DATE = "2026-09-25";
