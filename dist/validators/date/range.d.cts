/**
 * Date range validation
 * @param {Date | string} minDate Minimum allowed date
 * @param {Date | string} maxDate Maximum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * dateRange(new Date("2024-01-01"), new Date("2024-12-31"))
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const dateRange: (minDate: Date | string, maxDate: Date | string, message?: string) => ((value: any) => string);

export { dateRange };
