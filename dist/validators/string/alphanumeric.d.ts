import { ValidationRule } from '../../types/validation-rule.js';

/**
 * Alphanumeric characters only validation (a-z, A-Z, 0-9, spaces optional)
 * @param {boolean} allowSpaces Allow spaces in the value (Optional, default: false)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const alphanumeric: (allowSpaces?: boolean, message?: string) => ValidationRule;

export { alphanumeric };
