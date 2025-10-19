// src/validators/string/same-as.ts
/**
 * SameAs - Compares two values for equality
 * @param {any | (() => any)} compareValue The value to compare against or getter function
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 *  sameAs(() => model.password.value, "Passwords don't match!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const sameAs = (
    compareValue: (() => any) | any,
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";

        const valueToCompare =
            typeof compareValue === "function" ? compareValue() : compareValue;

        if (value !== valueToCompare) {
            return message || "Values don't match";
        }
        return "";
    };
};