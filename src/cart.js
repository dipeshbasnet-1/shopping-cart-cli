// cart functions
// A cart item looks like: { name: "Book", price: 50000, quantity: 2 }
// price is stored in PAISA (Rs. 500 = 50000 paisa) to avoid decimal errors.

export function addProduct(cart, product) {
    const quantity = product.quantity ?? 1;

    if (!product.name || product.price <= 0 || quantity <= 0) {
        throw new Error(`Invalid product: ${JSON.stringify(product)}`);
    }

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity += quantity;          // same product → just increase quantity
    } else {
        cart.push({ name: product.name, price: product.price, quantity });
    }
}

export function removeProduct(cart, productName) {
    return cart.filter(item => item.name !== productName);
}

export function isCartEmpty(cart) {
    return cart.length === 0;
}
