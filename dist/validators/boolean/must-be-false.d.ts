import { ValidationRule } from '../../types/validation-rule.js';

/**
 * Validates that a value is false, but only if the value is present.
 *
 * Truthy values such as "true", 1, "1" count as true.
 * Falsy values such as "false", 0, "0" count as false.
 */
declare const mustBeFalse: (message?: string) => ValidationRule;

export { mustBeFalse };
