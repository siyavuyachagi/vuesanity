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

        let pattern: RegExp;

        if (allowDecimals) {
            pattern = allowNegative
                ? /^-?\d+(\.\d+)?$/   // allows negative decimals
                : /^\d+(\.\d+)?$/;    // positive decimals only
        } else {
            pattern = allowNegative
                ? /^-?\d+$/            // negative integers allowed
                : /^\d+$/;             // positive integers only
        }

        if (!pattern.test(String(value))) {
            return message || "Only numeric values are allowed";
        }

        return "";
    };
};
