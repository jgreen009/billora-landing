import {
  SAMPLE_ITEMS,
  SAMPLE_DISCOUNT,
  SAMPLE_TAX_BASIS_POINTS,
  SAMPLE_QUOTE,
  SAMPLE_INVOICE,
  ISSUER,
  CLIENT,
  WALKTHROUGH_PAYMENT_MINOR,
  WALKTHROUGH_SNAPSHOT_DATE,
} from "@/lib/sample-data";
import { calculateTotals } from "@/lib/money";

describe("Sample Data Fixtures", () => {
  describe("Issuer", () => {
    it("has correct name and email", () => {
      expect(ISSUER.name).toBe("Billora Studio");
      expect(ISSUER.email).toBe("billing@billorastudio.example");
    });
  });

  describe("Client", () => {
    it("has correct details", () => {
      expect(CLIENT.name).toBe("Atlas Creative");
      expect(CLIENT.contact).toBe("Sarah Miller");
      expect(CLIENT.email).toBe("accounts@atlascreative.example");
    });
  });

  describe("Line Items", () => {
    it("has three items with correct values", () => {
      expect(SAMPLE_ITEMS).toHaveLength(3);

      expect(SAMPLE_ITEMS[0]).toEqual({
        id: "item-1",
        description: "Website design",
        quantityHundredths: 100,
        unitRateMinor: 250000,
      });

      expect(SAMPLE_ITEMS[1]).toEqual({
        id: "item-2",
        description: "Frontend development",
        quantityHundredths: 4000,
        unitRateMinor: 7500,
      });

      expect(SAMPLE_ITEMS[2]).toEqual({
        id: "item-3",
        description: "CMS integration",
        quantityHundredths: 100,
        unitRateMinor: 80000,
      });
    });
  });

  describe("Discount and Tax", () => {
    it("has 10% discount", () => {
      expect(SAMPLE_DISCOUNT).toEqual({
        type: "percentage",
        basisPoints: 1000,
      });
    });

    it("has 8% tax", () => {
      expect(SAMPLE_TAX_BASIS_POINTS).toBe(800);
    });
  });

  describe("Quote", () => {
    it("has correct metadata", () => {
      expect(SAMPLE_QUOTE.kind).toBe("quote");
      expect(SAMPLE_QUOTE.number).toBe("QT-0018");
      expect(SAMPLE_QUOTE.currency).toBe("USD");
      expect(SAMPLE_QUOTE.issueDate).toBe("2026-09-18");
      expect(SAMPLE_QUOTE.dueOrExpiryDate).toBe("2026-10-02");
      expect(SAMPLE_QUOTE.template).toBe("modern");
      expect(SAMPLE_QUOTE.isSample).toBe(true);
    });
  });

  describe("Invoice", () => {
    it("has correct metadata", () => {
      expect(SAMPLE_INVOICE.kind).toBe("invoice");
      expect(SAMPLE_INVOICE.number).toBe("INV-0032");
      expect(SAMPLE_INVOICE.currency).toBe("USD");
      expect(SAMPLE_INVOICE.issueDate).toBe("2026-09-22");
      expect(SAMPLE_INVOICE.dueOrExpiryDate).toBe("2026-10-06");
      expect(SAMPLE_INVOICE.template).toBe("modern");
      expect(SAMPLE_INVOICE.isSample).toBe(true);
    });
  });

  describe("Walkthrough Constants", () => {
    it("has correct payment amount", () => {
      expect(WALKTHROUGH_PAYMENT_MINOR).toBe(200000);
    });

    it("has correct snapshot date", () => {
      expect(WALKTHROUGH_SNAPSHOT_DATE).toBe("2026-09-25");
    });
  });

  describe("Financial Consistency", () => {
    it("quote and invoice have identical line items", () => {
      expect(SAMPLE_QUOTE.items).toEqual(SAMPLE_INVOICE.items);
    });

    it("quote and invoice have identical discount and tax", () => {
      expect(SAMPLE_QUOTE.discount).toEqual(SAMPLE_INVOICE.discount);
      expect(SAMPLE_QUOTE.taxBasisPoints).toBe(SAMPLE_INVOICE.taxBasisPoints);
    });

    it("calculated totals match canonical values", () => {
      const totals = calculateTotals(
        SAMPLE_ITEMS,
        SAMPLE_DISCOUNT,
        SAMPLE_TAX_BASIS_POINTS,
      );

      expect(totals.subtotalMinor).toBe(630000);
      expect(totals.discountMinor).toBe(63000);
      expect(totals.taxableMinor).toBe(567000);
      expect(totals.taxMinor).toBe(45360);
      expect(totals.totalMinor).toBe(612360);
    });
  });
});
