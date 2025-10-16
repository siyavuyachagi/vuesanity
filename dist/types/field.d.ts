import { ValidationRule } from './rule.js';

/**
 * FieldConfig is an object containing fields such as `value`, `validations`, and `errors`.
 */
interface FieldConfig {
    type?: any | any[];
    validations?: ValidationRule[];
    value?: any | any[];
    errors?: string[];
}

export type { FieldConfig };
