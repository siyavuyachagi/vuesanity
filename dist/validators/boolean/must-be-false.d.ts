import { ValidationRule } from "~/src/types";
/**
 * Validates that a value is false, but only if the value is present.
 *
 * Truthy values such as "true", 1, "1" count as true.
 * Falsy values such as "false", 0, "0" count as false.
 */
export declare const mustBeFalse: (message?: string) => ValidationRule;
