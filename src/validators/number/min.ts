// src/validators/number/min.ts
/**
 * Minimum number value validation
 * @param {number} min Minimum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * min(0, "Value must be at least 0")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const min = (min: number, message?: string) => {
    return (value: any): string => {
        if (value === null || value === undefined || value === "") return "";

        const numValue = Number(value);
        if (isNaN(numValue) || numValue < min) {
            return message || `Value must be at least ${min}`;
        }
        return "";
    };
};