// src/validators/string/different-from.ts
/**
 * DifferentFrom - Ensures a value is NOT equal to another value
 * @param {any | (() => any)} compareValue The value to compare against or getter function
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 *  differentFrom(() => model.oldPassword.value, "New password must be different")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const differentFrom = (compareValue, message) => {
    return (value) => {
        if (!value)
            return "";
        const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
        if (value === valueToCompare) {
            return message || "Value must be different";
        }
        return "";
    };
};
