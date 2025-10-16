// src/validators/string/min-chars.ts
/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional).
 * @returns Validation function that returns error message or empty string
 */
export const minChars = (length: number, message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        if (value.length < length) {
            return message || `Minimum length of ${length} characters required`;
        }
        return "";
    };
};