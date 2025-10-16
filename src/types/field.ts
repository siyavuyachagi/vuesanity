import { ValidationRule } from "./rule";

/**
 * FieldConfig is an object containing fields such as `value`, `validations`, and `errors`.
 */
export interface FieldConfig {
    type?: any | any[];
    validations?: ValidationRule[];
    value?: any | any[];
    errors?: string[];
}