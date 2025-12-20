// src/validators/string/alpha.ts
/**
 * Alphabetic characters only validation (a-z, A-Z, spaces optional)
 * @param {boolean} allowSpaces Allow spaces in the value (Optional, default: true)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const alpha = (allowSpaces = true, message) => {
    return (value) => {
        if (!value)
            return null;
        const pattern = allowSpaces ? /^[a-zA-Z\s]*$/ : /^[a-zA-Z]*$/;
        if (!pattern.test(value)) {
            return message || "Only alphabetic characters are allowed";
        }
        return null;
    };
};
