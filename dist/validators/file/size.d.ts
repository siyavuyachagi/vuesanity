/**
 * File size validation
 * @param {number} length File size in ```megabytes```
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * size(5, "File size exceeds the limit!")
 * ```
 * @returns Validation function that returns error message or null
 */
declare const size: (length: number, message?: string) => ((value: any) => string | null);

export { size };
