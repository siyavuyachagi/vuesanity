/**
 * Number range validation
 * @param {number} min Minimum allowed value
 * @param {number} max Maximum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * rangeNumber(1, 100, "Value must be between 1 and 100")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const rangeNumber: (min: number, max: number, message?: string) => (value: any) => string;

export { rangeNumber };
