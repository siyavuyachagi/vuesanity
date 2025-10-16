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
export const url = (message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        try {
            new URL(value);
            return "";
        } catch {
            return message || "Invalid URL format";
        }
    };
};