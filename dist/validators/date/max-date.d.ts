/**
 * Maximum date validation
 * @param {Date | string} maxDate Maximum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * maxDate(new Date(), "Date cannot be in the future")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export declare const maxDate: (maxDate: Date | string, message?: string) => ((value: any) => string);
