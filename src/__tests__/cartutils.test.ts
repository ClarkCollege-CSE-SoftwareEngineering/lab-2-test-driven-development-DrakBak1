import { describe, it, expect } from "vitest";
//import { applyDiscount } from "../cartUtils";
import {
  applyDiscount,
  calculateTax,
  calculateTotal,
  CartItem,
} from "../cartUtils";

describe("applyDiscount", () => {
    it("applies a percentage discount to a price", () => {
        expect(applyDiscount(100, 10)).toBe(90);
    });
 it("returns the original price when discount is 0%", () => {
    expect(applyDiscount(50, 0)).toBe(50);
  });

  it("returns 0 when discount is 100%", () => {
    expect(applyDiscount(75, 100)).toBe(0);
  });

  it("handles decimal prices correctly", () => {
    expect(applyDiscount(19.99, 10)).toBeCloseTo(17.99, 2);
  });

  it("throws an error for negative prices", () => {
    expect(() => applyDiscount(-10, 10)).toThrow("Price cannot be negative");
  });

  it("throws an error for negative discount percentages", () => {
    expect(() => applyDiscount(100, -5)).toThrow("Discount cannot be negative");
  });

  it("throws an error for discount greater than 100%", () => {
    expect(() => applyDiscount(100, 150)).toThrow(
      "Discount cannot exceed 100%"
    );
  });
});

//import { applyDiscount, calculateTax } from "../cartUtils";

describe("calculateTax", () => {
  it("calculates tax on a price", () => {
    expect(calculateTax(100, 8.5)).toBeCloseTo(8.5, 2);
  });

  it("returns 0 tax when rate is 0%", () => {
    expect(calculateTax(50, 0)).toBe(0);
  });

  it("handles decimal prices correctly", () => {
    expect(calculateTax(19.99, 10)).toBeCloseTo(2.0, 2);
  });

  it("returns 0 tax when item is tax-exempt", () => {
    expect(calculateTax(100, 8.5, true)).toBe(0);
  });

  it("throws an error for negative prices", () => {
    expect(() => calculateTax(-10, 8.5)).toThrow("Price cannot be negative");
  });

  it("throws an error for negative tax rates", () => {
    expect(() => calculateTax(100, -5)).toThrow("Tax rate cannot be negative");
  });
});


//--------------------------------------------------------------

describe("calculateTotal", () => {
  it("calculates totals for a single item", () => {
    const items: CartItem[] = [
      { price: 100, quanitity: 1 }
    ];

    const result = calculateTotal(items, 0, 10);

    expect(result.subtotal).toBe(100);
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(10);
    expect(result.total).toBe(110);
  });

  it("calculates totals for multiple items", () => {
    const items: CartItem[] = [
      { price: 50, quanitity: 2 },
      { price: 30, quanitity: 1 }
    ];

    const result = calculateTotal(items, 0, 10);

    expect(result.subtotal).toBe(130);
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(13);
    expect(result.total).toBe(143);
  });

  it("applies discount before calculating tax", () => {
    const items: CartItem[] = [
      { price: 100, quanitity: 1 }
    ];

    const result = calculateTotal(items, 10, 10);
    // subtotal = 100
    // discount = 10
    // tax = 10% of 90 = 9
    // total = 99

    expect(result.subtotal).toBe(100);
    expect(result.discount).toBe(10);
    expect(result.tax).toBe(9);
    expect(result.total).toBe(99);
  });

  it("excludes tax-exempt items from tax calculation", () => {
    const items: CartItem[] = [
      { price: 100, quanitity: 1, isTaxExempt: true },
      { price: 50, quanitity: 1 }
    ];

    const result = calculateTotal(items, 0, 10);
    // tax only the 50 

    expect(result.subtotal).toBe(150);
    expect(result.tax).toBe(5);
    expect(result.total).toBe(155);
  });

  it("returns zeros for an empty cart", () => {
    const result = calculateTotal([], 10, 10);

    expect(result.subtotal).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.total).toBe(0);
  });

  it("handles mixed taxable and tax-exempt items with discount", () => {
    const items: CartItem[] = [
      { price: 100, quanitity: 1, isTaxExempt: true },
      { price: 100, quanitity: 1 }
    ];

    const result = calculateTotal(items, 10, 10);
    // subtotal = 200
    // discount = 20
    // discounted total = 180
    // tax applies only to taxed items = 90
    // tax = 9
    // total = 189

    expect(result.subtotal).toBe(200);
    expect(result.discount).toBe(20);
    expect(result.tax).toBe(9);
    expect(result.total).toBe(189);
  });
});