/**
 * Email validation with domain restriction
 * @param {string[]} domains List of allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * email(["domain.com", "domain.co.za"], "Invalid email format");
 * // Or
 * email("domain.com", "Invalid email format");
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const email: (domains?: string[], message?: string) => ((value: any) => string);

export { email };
