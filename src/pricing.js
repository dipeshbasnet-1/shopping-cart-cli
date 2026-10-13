// pricing functions (all amounts in paisa)

export const VAT_RATE = 0.13; // Nepal VAT is 13%

export const DISCOUNT_CODES = {
    SAVE10: { type: "percent", value: 10 },     // 10% off
    FLAT500: { type: "flat", value: 50000 },    // Rs. 500 off
};

export function calculateSubtotal(cart) {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}

export function calculateDiscount(subtotal, code) {
    if (!code) return 0;

    const discount = DISCOUNT_CODES[code.toUpperCase()];
    if (!discount) {
        throw new Error(`Unknown discount code: ${code}`);
    }

    if (discount.type === "percent") {
        return Math.round(subtotal * discount.value / 100);
    }
    return Math.min(discount.value, subtotal); // flat discount can't go below zero
}

export function calculateVat(amount) {
    return Math.round(amount * VAT_RATE);
}

export function calculateTotals(cart, discountCode) {
    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal, discountCode);
    const taxable = subtotal - discount;
    const vat = calculateVat(taxable);
    const total = taxable + vat;

    return { subtotal, discount, vat, total };
}

// 123450 paisa → "Rs. 1,234.50"
export function formatRs(paisa) {
    return "Rs. " + (paisa / 100).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
