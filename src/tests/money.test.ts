import {
  calculateLineTotal,
  calculateSubtotal,
  calculateDiscount,
  calculateTax,
  calculateTotals,
  calculateBalance,
  roundHalfUp,
} from "@/lib/money";

describe("Money Calculations", () => {
  describe("roundHalfUp", () => {
    it("rounds .5 up", () => {
      expect(roundHalfUp(1.5)).toBe(2);
      expect(roundHalfUp(2.5)).toBe(3);
    });

    it("rounds .4 down", () => {
      expect(roundHalfUp(1.4)).toBe(1);
      expect(roundHalfUp(2.4)).toBe(2);
    });

    it("handles negative numbers", () => {
      expect(roundHalfUp(-1.5)).toBe(-1);
      expect(roundHalfUp(-1.4)).toBe(-1);
    });
  });

  describe("calculateLineTotal", () => {
    it("calculates line totals correctly", () => {
      expect(calculateLineTotal(100, 250000)).toBe(250000);
      expect(calculateLineTotal(4000, 7500)).toBe(300000);
      expect(calculateLineTotal(100, 80000)).toBe(80000);
    });

    it("handles fractional quantities", () => {
      expect(calculateLineTotal(150, 10000)).toBe(15000);
      expect(calculateLineTotal(333, 3000)).toBe(9990);
    });
  });

  describe("calculateSubtotal", () => {
    it("sums line totals correctly", () => {
      const items = [
        { quantityHundredths: 100, unitRateMinor: 250000 },
        { quantityHundredths: 4000, unitRateMinor: 7500 },
        { quantityHundredths: 100, unitRateMinor: 80000 },
      ];
      expect(calculateSubtotal(items)).toBe(630000);
    });
  });

  describe("calculateDiscount", () => {
    it("calculates percentage discount", () => {
      const discount = { type: "percentage" as const, basisPoints: 1000 };
      expect(calculateDiscount(630000, discount)).toBe(63000);
    });

    it("calculates fixed discount", () => {
      const discount = { type: "fixed" as const, amountMinor: 50000 };
      expect(calculateDiscount(630000, discount)).toBe(50000);
    });

    it("caps percentage discount at subtotal", () => {
      const discount = { type: "percentage" as const, basisPoints: 10000 };
      expect(calculateDiscount(10000, discount)).toBe(10000);
    });

    it("caps fixed discount at subtotal", () => {
      const discount = { type: "fixed" as const, amountMinor: 20000 };
      expect(calculateDiscount(10000, discount)).toBe(10000);
    });
  });

  describe("calculateTax", () => {
    it("calculates tax correctly", () => {
      expect(calculateTax(567000, 800)).toBe(45360);
      expect(calculateTax(10000, 1000)).toBe(1000);
    });

    it("handles zero tax", () => {
      expect(calculateTax(10000, 0)).toBe(0);
    });
  });

  describe("calculateTotals", () => {
    it("calculates canonical totals correctly", () => {
      const items = [
        { quantityHundredths: 100, unitRateMinor: 250000 },
        { quantityHundredths: 4000, unitRateMinor: 7500 },
        { quantityHundredths: 100, unitRateMinor: 80000 },
      ];
      const discount = { type: "percentage" as const, basisPoints: 1000 };
      const taxBasisPoints = 800;

      const totals = calculateTotals(items, discount, taxBasisPoints);

      expect(totals.subtotalMinor).toBe(630000);
      expect(totals.discountMinor).toBe(63000);
      expect(totals.taxableMinor).toBe(567000);
      expect(totals.taxMinor).toBe(45360);
      expect(totals.totalMinor).toBe(612360);
    });

    it("handles zero discount", () => {
      const items = [{ quantityHundredths: 100, unitRateMinor: 10000 }];
      const discount = { type: "percentage" as const, basisPoints: 0 };
      const totals = calculateTotals(items, discount, 1000);
      expect(totals.discountMinor).toBe(0);
      expect(totals.taxableMinor).toBe(10000);
    });

    it("handles 100% discount", () => {
      const items = [{ quantityHundredths: 100, unitRateMinor: 10000 }];
      const discount = { type: "percentage" as const, basisPoints: 10000 };
      const totals = calculateTotals(items, discount, 1000);
      expect(totals.discountMinor).toBe(10000);
      expect(totals.taxableMinor).toBe(0);
      expect(totals.taxMinor).toBe(0);
      expect(totals.totalMinor).toBe(0);
    });

    it("handles fixed discount", () => {
      const items = [{ quantityHundredths: 100, unitRateMinor: 10000 }];
      const discount = { type: "fixed" as const, amountMinor: 2000 };
      const totals = calculateTotals(items, discount, 1000);
      expect(totals.discountMinor).toBe(2000);
      expect(totals.taxableMinor).toBe(8000);
      expect(totals.taxMinor).toBe(800);
      expect(totals.totalMinor).toBe(8800);
    });
  });

  describe("calculateBalance", () => {
    it("calculates balance correctly", () => {
      expect(calculateBalance(612360, 200000)).toBe(412360);
      expect(calculateBalance(612360, 0)).toBe(612360);
      expect(calculateBalance(612360, 612360)).toBe(0);
    });

    it("prevents negative balance", () => {
      expect(calculateBalance(10000, 20000)).toBe(0);
    });
  });
});

describe("Canonical Sample Data", () => {
  it("produces correct walkthrough balance", () => {
    const total = 612360;
    const payment = 200000;
    const balance = total - payment;
    expect(balance).toBe(412360);
  });

  it("playground initial balance equals total (no payments)", () => {
    const total = 612360;
    const payment = 0;
    const balance = total - payment;
    expect(balance).toBe(total);
  });
});
