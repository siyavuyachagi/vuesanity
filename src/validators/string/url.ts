// src/validators/string/url.ts

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
export const url = (message?: string): ValidationRule => {
    return (value: any): string | null => {
        if (!value) return null;
        try {
            new URL(value);
            return null;
        } catch {
            return message || "Invalid URL format";
        }
    };
};