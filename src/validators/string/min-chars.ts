// src/validators/string/min-chars.ts

import { ValidationRule } from "~/src/types";

/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional).
 * @returns Validation function that returns error message or null
 */
export const minChars = (length: number, message?: string): ValidationRule => {
    return (value: any): string | null => {
        const str = String(value);
        if (str.length < length) {
            return message || `Minimum length of ${length} characters required`;
        }
        return null;
    };
};