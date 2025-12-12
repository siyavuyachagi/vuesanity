import { ValidationRule } from '../../types/validation-rule.cjs';

/**
 * URL validation
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * url("Please enter a valid URL")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const url: (message?: string) => ValidationRule;

export { url };
