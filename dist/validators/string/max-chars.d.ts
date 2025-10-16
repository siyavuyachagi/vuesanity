/**
 * Maximum characters required.
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 * @returns
 */
declare const maxChars: (length: number, message?: string) => (value: any) => string | null;

export { maxChars };
