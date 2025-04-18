/**
 * Email validation with domain restriction
 * @param {string[]} allowedDomains List of allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```
 * email([ "domain.com","domain.co.za" ],"Invalid email format")
 * ```
 * return
 */
declare const email: (allowedDomains?: string[], message?: string) => ((value: any) => string | null);
/**
 * Length
 * @param {string[]} length Length of characters required.
 * @param {string} message Custom error message (Optional)
 * return
 */
declare const length: (length: number, message?: string) => ((value: any) => string | null);
/**
 * Miximum length
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 *
 */
declare const maxLength: (length: number, message?: string) => (value: any) => string | null;
/**
 * MinLength
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional)
 *
 */
declare const minLength: (length: number, message?: string) => (value: any) => string | null;
/**
 * Phone
 * @param {string} locale Locale for phone number validation (Optional)
 * @param {string} message Error message (Optional)
 * @returns {string | null} Error message if validation fails, otherwise null
 */
declare const phone: (locale?: string, message?: string) => (value: any) => string | null;
/**
 * Required
 * @param {string} message Error message (Optional)
 *
 */
declare const required: (message?: string) => (value: any) => string | null;
/**
 * SameAs - Compares two values for equality
 * @param {any} compareValue The value to compare against
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * // In your model configuration:
 * confirmPassword: {
 *   value: '',
 *   validations: [
 *     required(),
 *     sameAs(() => model.password.value, "Passwords don't match!")
 *   ],
 *   errors: []
 * }
 * ```
 * @returns Validation function that returns error message or null
 */
declare const sameAs: (compareValue: (() => any) | any, message?: string) => ((value: any) => string | null);

export { email, length, maxLength, minLength, phone, required, sameAs };
