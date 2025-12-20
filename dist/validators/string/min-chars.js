// src/validators/string/min-chars.ts
/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional).
 * @returns Validation function that returns error message or null
 */
export const minChars = (length, message) => {
    return (value) => {
        const str = String(value);
        if (str.length < length) {
            return message || `Minimum length of ${length} characters required`;
        }
        return null;
    };
};
