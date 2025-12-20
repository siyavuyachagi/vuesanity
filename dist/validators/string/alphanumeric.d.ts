import { ValidationRule } from "~/src/types";
/**
 * Alphanumeric characters only validation (a-z, A-Z, 0-9, spaces optional)
 * @param {boolean} allowSpaces Allow spaces in the value (Optional, default: false)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export declare const alphanumeric: (allowSpaces?: boolean, message?: string) => ValidationRule;
