// export function calculateTotal(amounts: string): number {
//     // Split the amounts string by commas or new lines
//   return amounts
//     .split(/[\n,]+/) //the + means either a comma or newline more than one
//     .map((amount) => amount.trim()) //remove whitespace from each amount
//     .filter((amount) => amount !== "") // Filter out empty strings
//     .map((amount) => parseFloat(amount)) // Convert each amount to a number
//     .filter((num) => !isNaN(num))
//     .reduce((sum, num) => sum + num, 0);
// }

export function calculateTotal(amounts: string): number {
  // Split the amounts string by commas or new lines
  const amountArray = amounts
    .split(/[\n,]+/) //the + means either a comma or newline more than one
    .map((amount) => amount.trim()) //remove whitespace from each amount
    .filter((amount) => amount !== "") // Filter out empty strings
    .map((amount) => parseFloat(amount)); // Convert each amount to a number

  // Sum all the valid numbers(filter out NaN values)
  return amountArray
    .filter((num) => !isNaN(num))
    .reduce((sum, num) => sum + num, 0);
}

// export function calculateTotal(amounts: string): number {
//   return amounts
//     .split(/[\n,]+/)
//     .map(amount => parseFloat(amount.trim()))
//     .filter(num => !isNaN(num))
//     .reduce((sum, num) => sum + num, 0);
// }
