// src/validators/string/chars.ts
/**
 * Exact character length validation.
 * @param {number} length Exact length of characters required.
 * @param {string} message Custom error message (Optional).
 * @returns Validation function that returns error message or empty string
 */
export const chars = (
    length: number,
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";

        if (value.length !== length) {
            return message || `Number of characters required is ${length}!`;
        }
        return "";
    };
};