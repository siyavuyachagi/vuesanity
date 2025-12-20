// src/validators/string/same-as.ts

import { ValidationRule } from "~/src/types";

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
): ValidationRule => {
    return (value: any): string | null => {
        if (!value) return null;

        const valueToCompare =
            typeof compareValue === "function" ? compareValue() : compareValue;

        console.log('Comparing:', { value, valueToCompare, match: value === valueToCompare });

        if (value !== valueToCompare) {
            return message || "Values don't match";
        }
        return null;
    };
};