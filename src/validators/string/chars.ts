// src/validators/string/chars.ts

import { ValidationRule } from "~/src/types";

/**
 * Exact character length validation.
 * @param {number} length Exact length of characters required.
 * @param {string} message Custom error message (Optional).
 * @returns Validation function that returns error message or empty string
 */
export const chars = (
    length: number,
    message?: string
): ValidationRule => {
    return (value: any): string | null => {
        if (!value) return null;

        if (value.length !== length) {
            return message || `Number of characters required is ${length}`;
        }
        return null;
    };
};