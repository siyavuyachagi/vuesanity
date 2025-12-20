import { ValidationRule } from "~/src/types";
/**
 * Validates that a value is true, but only if the value is present.
 *
 * Works for: true, "true", 1, "1"
 */
export declare const mustBeTrue: (message?: string) => ValidationRule;
