import { ValidationRule } from '../../types/validation-rule.js';

/**
 * Validates that a value is true, but only if the value is present.
 *
 * Works for: true, "true", 1, "1"
 */
declare const mustBeTrue: (message?: string) => ValidationRule;

export { mustBeTrue };
