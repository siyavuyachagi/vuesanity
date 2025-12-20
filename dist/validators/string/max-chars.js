// src/validators/string/max-chars.ts
/**
 * Maximum characters required.
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const maxChars = (length, message) => {
    return (value) => {
        if (!value)
            return null;
        if (value.length > length) {
            return message || `Maximum length of ${length} characters required`;
        }
        return null;
    };
};
