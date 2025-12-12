import { ValidationRule } from '../../types/validation-rule.cjs';

/**
 * Alphabetic characters only validation (a-z, A-Z, spaces optional)
 * @param {boolean} allowSpaces Allow spaces in the value (Optional, default: true)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const alpha: (allowSpaces?: boolean, message?: string) => ValidationRule;

export { alpha };
