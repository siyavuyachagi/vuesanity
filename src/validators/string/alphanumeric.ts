// src/validators/string/alphanumeric.ts
/**
 * Alphanumeric characters only validation (a-z, A-Z, 0-9, spaces optional)
 * @param {boolean} allowSpaces Allow spaces in the value (Optional, default: false)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const alphanumeric = (
    allowSpaces: boolean = false,
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";

        const pattern = allowSpaces ? /^[a-zA-Z0-9\s]*$/ : /^[a-zA-Z0-9]*$/;
        if (!pattern.test(value)) {
            return message || "Only alphanumeric characters are allowed";
        }
        return "";
    };
};