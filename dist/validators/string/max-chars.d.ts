import { ValidationRule } from '../../types/validation-rule.js';

/**
 * Maximum characters required.
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const maxChars: (length: number, message?: string) => ValidationRule;

export { maxChars };
