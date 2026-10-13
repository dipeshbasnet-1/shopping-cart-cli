import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    calculateSubtotal,
    calculateDiscount,
    calculateVat,
    calculateTotals,
    formatRs,
} from '../src/pricing.js';

const cart = [
    { name: 'Notebook', price: 15000, quantity: 3 },  // Rs. 450
    { name: 'Backpack', price: 180000, quantity: 1 }, // Rs. 1,800
];

test('subtotal multiplies price by quantity', () => {
    assert.equal(calculateSubtotal(cart), 225000); // Rs. 2,250
});

test('no discount code means no discount', () => {
    assert.equal(calculateDiscount(225000, undefined), 0);
});

test('SAVE10 gives 10% off, and is not case-sensitive', () => {
    assert.equal(calculateDiscount(225000, 'SAVE10'), 22500);
    assert.equal(calculateDiscount(225000, 'save10'), 22500);
});

test('FLAT500 never makes the amount negative', () => {
    assert.equal(calculateDiscount(30000, 'FLAT500'), 30000); // Rs. 300 bill → only Rs. 300 off
});

test('unknown discount code throws an error', () => {
    assert.throws(() => calculateDiscount(10000, 'FREE100'), /Unknown discount code/);
});

test('VAT is 13%, rounded to the nearest paisa', () => {
    assert.equal(calculateVat(10000), 1300);
    assert.equal(calculateVat(209250), 27203); // 27202.5 → 27203
});

test('VAT is charged after the discount', () => {
    const totals = calculateTotals(cart, 'SAVE10');

    assert.deepEqual(totals, {
        subtotal: 225000,
        discount: 22500,
        vat: 26325,     // 13% of 202500
        total: 228825,  // Rs. 2,288.25
    });
});

test('formatRs shows rupees with commas and 2 decimals', () => {
    assert.equal(formatRs(123450), 'Rs. 1,234.50');
    assert.equal(formatRs(0), 'Rs. 0.00');
});
