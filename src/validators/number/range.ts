// src/validators/number/range.ts
/**
 * Number range validation
 * @param {number} min Minimum allowed value
 * @param {number} max Maximum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * range(1, 100, "Value must be between 1 and 100")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const range = (min: number, max: number, message?: string) => {
    return (value: any): string => {
        if (value === null || value === undefined || value === "") return "";

        const numValue = Number(value);
        if (isNaN(numValue) || numValue < min || numValue > max) {
            return message || `Value must be between ${min} and ${max}`;
        }
        return "";
    };
};