/**
 * Phone number validation using E.164 format
 * @param {string} locale Locale for phone number validation (Optional, currently unused)
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const phone: (locale?: string, message?: string) => (value: any) => string;

export { phone };
