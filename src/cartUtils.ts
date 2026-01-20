// export function applyDiscount(price: number, discountPercent: number): number {
//     return price - (price * discountPercent) / 100;
// }

export function applyDiscount(price: number, discountPercent: number): number {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  if (discountPercent < 0) {
    throw new Error("Discount cannot be negative");
  }
  if (discountPercent > 100) {
    throw new Error("Discount cannot exceed 100%");
  }

  const discountMultiplier = 1 - discountPercent / 100;
  return price * discountMultiplier;
  //return price - (price * discountPercent) / 100;
}

export function calculateTax(
    price: number,
    taxRate: number,
    isTaxExempt: boolean = false ): number{
        if (price < 0){
            throw new Error("Price cannot be negative");
        }
        if (taxRate < 0){
            throw new Error("Tax rate cannot be negative");
        }
        if (isTaxExempt){
            return 0;
        }
        return price * (taxRate / 100);
    }


    
export interface CartItem {
    price: number;
    quanitity: number;
    isTaxExempt?: boolean;
}

export interface CartTotals {
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
}

export function calculateTotal(
  items: CartItem[],
  discountPercent: number = 0,
  taxRate: number = 0
): CartTotals {
  // round to 2 decimal plcaes
  const round = (value: number) =>
    Math.round(value * 100) / 100;

  if (items.length === 0) {
    return {
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    };
  }

  // clculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quanitity;
  }, 0);

  // apply discount
  const discountedSubtotal = applyDiscount(subtotal, discountPercent);
  const discountAmount = subtotal - discountedSubtotal;

  // calculate tax taxables after discount
  let taxableAmountAfterDiscount = 0;

  for (const item of items) {
    if (!item.isTaxExempt) {
      const itemTotal = item.price * item.quanitity;

      // reduce item total based on discount
      const discountedItemTotal = applyDiscount(itemTotal, discountPercent);
      taxableAmountAfterDiscount += discountedItemTotal;
    }
  }

  const tax = calculateTax(taxableAmountAfterDiscount, taxRate);

  // calcualte final total
  const total = discountedSubtotal + tax;

  return {
    subtotal: round(subtotal),
    discount: round(discountAmount),
    tax: round(tax),
    total: round(total),
  };
}