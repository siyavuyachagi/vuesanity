/**
 * Minimum date validation
 * @param {Date | string} minDate Minimum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * minDate(new Date("2024-01-01"), "Date must be after 2024-01-01")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const minDate: (minDate: Date | string, message?: string) => ((value: any) => string);

export { minDate };
