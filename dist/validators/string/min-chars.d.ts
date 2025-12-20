import { ValidationRule } from "~/src/types";
/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional).
 * @returns Validation function that returns error message or null
 */
export declare const minChars: (length: number, message?: string) => ValidationRule;
