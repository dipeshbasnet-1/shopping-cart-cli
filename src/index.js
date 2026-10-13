import chalk from 'chalk';
import { addProduct } from './cart.js';
import { checkout } from './checkout.js';

// discount code can be passed from the terminal: node index.js SAVE10
const discountCode = process.argv[2];

const cart = [];

addProduct(cart, { name: "Notebook", price: 15000, quantity: 3 }); // Rs. 150 each
addProduct(cart, { name: "Pen", price: 2500, quantity: 2 });       // Rs. 25 each
addProduct(cart, { name: "Backpack", price: 180000 });             // Rs. 1,800
addProduct(cart, { name: "Pen", price: 2500 });                    // adds 1 more pen

try {
    checkout(cart, discountCode);
} catch (error) {
    console.log(chalk.red.bold("✖ Checkout failed: ") + chalk.red(error.message));
    process.exitCode = 1;
}
