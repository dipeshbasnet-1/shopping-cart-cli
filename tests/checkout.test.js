import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkout } from '../src/checkout.js';

test('checkout of an empty cart returns null', (t) => {
    t.mock.method(console, 'log', () => {}); // silence the printed receipt

    assert.equal(checkout([]), null);
});

test('checkout returns the totals and prints a receipt', (t) => {
    const log = t.mock.method(console, 'log', () => {});
    const cart = [{ name: 'Pen', price: 10000, quantity: 1 }];

    const totals = checkout(cart);

    assert.equal(totals.total, 11300); // Rs. 100 + 13% VAT
    assert.ok(log.mock.callCount() > 0, 'receipt should be printed');
});
