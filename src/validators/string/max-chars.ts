// src/validators/string/max-chars.ts

import { ValidationRule } from "~/src/types";

/**
 * Maximum characters required.
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const maxChars = (length: number, message?: string) : ValidationRule => {
    return (value: any): string | null => {
        if (!value) return null;

        if (value.length > length) {
            return message || `Maximum length of ${length} characters required`;
        }
        return null;
    };
};