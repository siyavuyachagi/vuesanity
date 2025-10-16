/**
 * Minimum number value validation
 * @param {number} min Minimum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * min(0, "Value must be at least 0")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const min: (min: number, message?: string) => (value: any) => string;

export { min };
