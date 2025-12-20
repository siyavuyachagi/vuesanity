import { ValidationRule } from "~/src/types";
/**
 * URL validation
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * url("Please enter a valid URL")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export declare const url: (message?: string) => ValidationRule;
