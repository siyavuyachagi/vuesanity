/**
 * Number range validation
 * @param {number} min Minimum allowed value
 * @param {number} max Maximum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * range(1, 100, "Value must be between 1 and 100")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const range: (min: number, max: number, message?: string) => (value: any) => string;

export { range };
