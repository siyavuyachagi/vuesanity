/**
 * Phone
 * @param {string} locale Locale for phone number validation (Optional)
 * @param {string} message Error message (Optional)
 * @returns {string | null} Error message if validation fails, otherwise null
 */
declare const phone: (locale?: string, message?: string) => (value: any) => string | null;

export { phone };
