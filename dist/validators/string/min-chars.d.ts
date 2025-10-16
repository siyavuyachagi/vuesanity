/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional).
 * @returns Validation function that returns error message or empty string
 */
declare const minChars: (length: number, message?: string) => (value: any) => string;

export { minChars };
