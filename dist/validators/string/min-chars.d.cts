/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (optional).
 * @returns
 */
declare const minChars: (length: number, message?: string) => (value: any) => string | null;

export { minChars };
