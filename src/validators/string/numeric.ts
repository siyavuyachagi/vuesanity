// src/validators/string/numeric.ts
/**
 * Numeric characters only validation
 * @param {boolean} allowDecimals Allow decimal points (Optional, default: false)
 * @param {boolean} allowNegative Allow negative numbers (Optional, default: false)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const numeric = (
    allowDecimals: boolean = false,
    allowNegative: boolean = false,
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";

        let pattern = allowNegative ? /^-?\d+/ : /^\d+/;
        if (allowDecimals) {
            pattern = allowNegative
                ? /^-?\d+\.?\d*$/
                : /^\d+\.?\d*$/;
        }

        if (!pattern.test(String(value))) {
            return message || "Only numeric values are allowed";
        }
        return "";
    };
};