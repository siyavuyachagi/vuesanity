// src/validators/string/same-as.ts

import { isTypeOfExpression } from "typescript";
import { FieldConfig, ValidationRule } from "../../types";

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
    compareValue: (() => any) | FieldConfig | any,
    message?: string
): ValidationRule => {
    return (value: any): string | null => {
        if (!value) return null;
        // If i'ts a function execute to get the actual value else return the type as is
        let valueToCompare =
            typeof compareValue === "function" ? compareValue() : compareValue;

        // If its of type object and can resolve to FieldConfig extract only the value else return as is
        valueToCompare = (typeof valueToCompare === 'object') ? (valueToCompare as FieldConfig).value : valueToCompare;

        if (value !== valueToCompare) {
            return message || "Values don't match";
        }
        return null;
    };
};