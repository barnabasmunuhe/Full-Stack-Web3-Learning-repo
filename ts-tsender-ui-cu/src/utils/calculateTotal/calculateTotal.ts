function calculateTotal(amounts: string): number {
    // Split the amounts string by commas or new lines
    const amountArray = amounts
    .split(/[\s,]+/)
    .map(amount => amount.trim())//remove whitespace from each amount
    .filter(amount => amount !== ''); // Filter out empty strings
    .map(amount: string => parseFloat(amount)); // Convert each amount to a number

    // Sum all the valid numbers(filter out NaN values)
    return amountArray
    .filter(num => !isNaN(num))
    .reduce((sum, num) => sum + num, 0);
}    