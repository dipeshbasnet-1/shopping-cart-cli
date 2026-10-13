import chalk from 'chalk';
import { formatRs } from './pricing.js';

const WIDTH = 33;
const line = (char) => chalk.gray(char.repeat(WIDTH));

// One receipt row: label on the left, amount on the right.
// IMPORTANT: pad FIRST, colour AFTER — chalk adds hidden colour codes
// that padEnd/padStart would count as characters and break alignment.
function row(label, amount, colour = (text) => text) {
    return colour(label.padEnd(18) + amount.padStart(15));
}

export function printReceipt(cart, totals, discountCode) {
    console.log(chalk.bold.cyan("RECEIPT".padStart(20)));
    console.log(line("="));

    for (const item of cart) {
        const lineTotal = item.price * item.quantity;
        console.log(row(`${item.name} x${item.quantity}`, formatRs(lineTotal)));
    }

    console.log(line("-"));
    console.log(row("Subtotal", formatRs(totals.subtotal)));

    if (totals.discount > 0) {
        console.log(row(`Discount (${discountCode.toUpperCase()})`, "-" + formatRs(totals.discount), chalk.red));
    }

    console.log(row("VAT (13%)", formatRs(totals.vat), chalk.yellow));
    console.log(line("-"));
    console.log(row("TOTAL", formatRs(totals.total), chalk.bold.green));
    console.log(line("="));
}
