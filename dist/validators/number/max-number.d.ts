/**
 * Maximum number value validation
 * @param {number} max Maximum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * maxNumber(100, "Value cannot exceed 100")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export declare const maxNumber: (max: number, message?: string) => (value: any) => string;
