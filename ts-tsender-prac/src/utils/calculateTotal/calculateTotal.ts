export function calculateTotal(amounts: string): number {
  // Split the amounts string by commas or new lines
  const amountArray = amounts
    .split(/[\n,]+/) //the + means either a comma or newline more than one
    .map((amount) => amount.trim()) //remove whitespace from each amount
    .filter((amount) => amount !== "") // Filter out empty strings
    .map((amount) => parseFloat(amount)); // Convert each amount to a number with decimal point.(parseFloat)

  // Sum all the valid numbers(filter out NaN values)
  return amountArray
    .filter((num) => !isNaN(num))
    .reduce((sum, num) => sum + num, 0); //the key line that does the addition of all amounts
}

// AI Prompt sample to generate unit tests:

// -Here's what am going with:
// export function calculateTotal(amounts: string): number {
//   // Split the amounts string by commas or new lines
//   const amountArray = amounts
//     .split(/[\n,]+/) //the + means either a comma or newline more than one
//     .map((amount) => amount.trim()) //remove whitespace from each amount
//     .filter((amount) => amount !== "") // Filter out empty strings
//     .map((amount) => parseFloat(amount)); // Convert each amount to a number with decimal point.(parseFloat)

//   // Sum all the valid numbers(filter out NaN values)
//   return amountArray
//     .filter((num) => !isNaN(num))
//     .reduce((sum, num) => sum + num, 0); //the key line that does the addition of all amounts
// }

// Can you write me a test for this now? I'm going to use 'vitest' & have the test be in the same dir.
