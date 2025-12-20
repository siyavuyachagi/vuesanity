// src/validators/string/url.ts
/**
 * URL validation
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * url("Please enter a valid URL")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const url = (message) => {
    return (value) => {
        if (!value)
            return null;
        try {
            new URL(value);
            return null;
        }
        catch {
            return message || "Invalid URL format";
        }
    };
};
