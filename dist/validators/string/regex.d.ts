/**
 * Custom regex pattern validation
 * @param {RegExp} pattern Regular expression pattern to match
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * regex(/^[A-Z]{3}\d{3}$/, "Format must be ABC123")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const regex: (pattern: RegExp, message?: string) => ((value: any) => string);

export { regex };
