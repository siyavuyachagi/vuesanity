import { ValidationRule } from './validation-rule.cjs';

/**
 * FieldConfig is an object containing fields such as `value`, `validations`, and `errors`.
 * All properties are optional to allow flexible configuration.
 *
 * @example
 * ```ts
 * import { required, email } from './validators';
 *
 * // Full configuration
 * const emailField: FieldConfig<string> = {
 *   value: '',
 *   validations: [required(), email()],
 *   errors: []
 * };
 *
 * // Minimal configuration - only validations
 * const nameField: FieldConfig<string> = {
 *   validations: [required()]
 * };
 *
 * // No configuration at all
 * const optionalField: FieldConfig<string> = {};
 * ```
 */
interface FieldConfig<T = any> {
    value?: T;
    errors?: string[];
    validations?: ValidationRule[];
}

export type { FieldConfig };
