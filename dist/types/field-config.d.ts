import { ValidationRule } from './validation-rule.js';

/**
 * FieldConfig is an object containing fields such as `value`, `validations`, and `errors`.
 * @example
 * ```ts
 * import { required, email } from './validators';
 *
 * const emailField: FieldConfig<string> = {
 *   value: '',
 *   validations: [required(), email()],
 *   errors: []
 * };
 *
 * const acceptedTermsField: FieldConfig<boolean> = {
 *   value: false,
 *   validations: [required('You must accept the terms')],
 *   errors: []
 * };
 * ```
 */
interface FieldConfig<T = any> {
    value: T;
    errors?: string[];
    validations?: ValidationRule[];
}

export type { FieldConfig };
