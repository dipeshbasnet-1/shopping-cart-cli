import chalk from 'chalk';
import { isCartEmpty } from './cart.js';
import { calculateTotals } from './pricing.js';
import { printReceipt } from './receipt.js';

// checkout function
export function checkout(cart, discountCode) {
    if (isCartEmpty(cart)) {
        console.log(chalk.yellow("Cart is empty!"));
        return null;
    }

    console.log(chalk.blueBright("Starting checkout...\n"));
    const totals = calculateTotals(cart, discountCode);
    printReceipt(cart, totals, discountCode);
    console.log(chalk.green.bold("\n✔ Payment successful!"));

    return totals;
}
