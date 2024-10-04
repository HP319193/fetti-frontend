export const formatNumberToAmount = (amount: any, decimalPlaces = 2) => {
    let rawAmount = amount;
    // Check if the input is a valid number
    if (isNaN(rawAmount) || typeof rawAmount !== "number") {
      rawAmount = parseFloat(rawAmount);
    }
  
    // Round the number to the specified decimal places
    const roundedAmount = parseFloat(rawAmount.toFixed(decimalPlaces));

    // Separate thousands with commas and add trailing zeros if needed
    const parts = roundedAmount.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    }).split(".");

  return parts.join(".");
}

export const getOrdinalIndicator = (inputNum: number) => {
  const indicators = ['th', 'st', 'nd', 'rd'];
  const lastDigit = inputNum % 10;
  const secondLastDigit = Math.floor((inputNum % 100) / 10);
  if (secondLastDigit === 1 || lastDigit > 3) {
    return indicators[0];
  } else {
    return indicators[lastDigit];
  }
};