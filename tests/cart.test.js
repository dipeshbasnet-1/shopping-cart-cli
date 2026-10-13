import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addProduct, removeProduct, isCartEmpty } from '../src/cart.js';

test('a new cart is empty', () => {
    assert.equal(isCartEmpty([]), true);
});

test('addProduct adds an item with quantity 1 by default', () => {
    const cart = [];
    addProduct(cart, { name: 'Pen', price: 2500 });

    assert.deepEqual(cart, [{ name: 'Pen', price: 2500, quantity: 1 }]);
});

test('adding the same product again increases its quantity', () => {
    const cart = [];
    addProduct(cart, { name: 'Pen', price: 2500, quantity: 2 });
    addProduct(cart, { name: 'Pen', price: 2500 });

    assert.equal(cart.length, 1);
    assert.equal(cart[0].quantity, 3);
});

test('addProduct rejects invalid products', () => {
    assert.throws(() => addProduct([], { name: '', price: 100 }));
    assert.throws(() => addProduct([], { name: 'Pen', price: -5 }));
    assert.throws(() => addProduct([], { name: 'Pen', price: 100, quantity: 0 }));
});

test('removeProduct removes only the named product', () => {
    const cart = [];
    addProduct(cart, { name: 'Pen', price: 2500 });
    addProduct(cart, { name: 'Book', price: 50000 });

    const updated = removeProduct(cart, 'Pen');

    assert.deepEqual(updated.map(item => item.name), ['Book']);
});
