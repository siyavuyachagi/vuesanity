// src/validators/string/regex.ts
/**
 * Custom regex pattern validation
 * @param {RegExp} pattern Regular expression pattern to match
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * regex(/^[A-Z]{3}\d{3}$/, "Format must be ABC123")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const regex = (pattern, message) => {
    return (value) => {
        if (!value)
            return "";
        if (!pattern.test(value)) {
            return message || "Value does not match the required pattern";
        }
        return "";
    };
};
