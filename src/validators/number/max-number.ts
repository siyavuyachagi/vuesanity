// src/validators/number/max-number.ts
/**
 * Maximum number value validation
 * @param {number} max Maximum allowed value
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * maxNumber(100, "Value cannot exceed 100")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const maxNumber = (max: number, message?: string) => {
    return (value: any): string => {
        if (value === null || value === undefined || value === "") return "";

        const numValue = Number(value);
        if (isNaN(numValue) || numValue > max) {
            return message || `Value cannot exceed ${max}`;
        }
        return "";
    };
};