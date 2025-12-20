/**
 * Date range validation
 * @param {Date | string} minDate Minimum allowed date
 * @param {Date | string} maxDate Maximum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * rangeDate(new Date("2024-01-01"), new Date("2024-12-31"))
 * ```
 * @returns Validation function that returns error message or empty string
 */
export declare const rangeDate: (minDate: Date | string, maxDate: Date | string, message?: string) => ((value: any) => string);
