/**
 * Numeric characters only validation
 * @param {boolean} allowDecimals Allow decimal points (Optional, default: false)
 * @param {boolean} allowNegative Allow negative numbers (Optional, default: false)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const numeric: (allowDecimals?: boolean, allowNegative?: boolean, message?: string) => ((value: any) => string);

export { numeric };
