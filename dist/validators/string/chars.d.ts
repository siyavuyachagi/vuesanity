/**
 * Exact character length validation.
 * @param {number} length Exact length of characters required.
 * @param {string} message Custom error message (Optional).
 * @returns Validation function that returns error message or empty string
 */
declare const chars: (length: number, message?: string) => ((value: any) => string);

export { chars };
