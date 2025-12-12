import { ValidationRule } from "~/src/types";

/**
 * Validates that a value is false, but only if the value is present.
 *
 * Truthy values such as "true", 1, "1" count as true.
 * Falsy values such as "false", 0, "0" count as false.
 */
export const mustBeFalse = (message?: string): ValidationRule => {
    return (value: any): string | null => {
        if (value === null || value === undefined || value === "") return null;

        // Normalize booleans
        const normalized = 
            value === true ? true :
            value === false ? false :
            value === "true" ? true :
            value === "false" ? false :
            value === 1 ? true :
            value === 0 ? false :
            Boolean(value);

        if (normalized === true) {
            return message || "Value must be false";
        }

        return null;
    };
};
