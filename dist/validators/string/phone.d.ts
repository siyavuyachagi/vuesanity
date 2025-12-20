/**
 * Phone number validation with optional country-specific validation
 *
 * @param {string} locale ISO country code (e.g., 'ZA', 'US', 'GB') for country-specific validation
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 *
 * @example
 * ```ts
 * // Generic E.164 validation
 * phone()
 *
 * // South Africa specific (9-digit national number)
 * phone('ZA', 'Invalid South African phone number')
 *
 * // US specific (10-digit)
 * phone('US')
 * ```
 */
export declare const phone: (locale?: string, message?: string) => (value: any) => string;
