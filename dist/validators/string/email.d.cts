import { ValidationRule } from '../../types/validation-rule.cjs';

/**
 * Email validation with domain restriction
 * @param {string | string[]} allowedDomains Allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * email("domain.com", "Invalid email format");
 * // Or
 * email(["domain.com", "domain.co.za"], "Invalid email format");
 * ```
 * @returns Validation function that returns error message or null
 */
declare const email: (allowedDomains?: string | string[], message?: string) => ValidationRule;

export { email };
