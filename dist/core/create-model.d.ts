import { FieldConfig } from '../types/field-config.js';
import { ModelConfig } from '../types/model-config.js';
import '../types/validation-rule.js';

/**
 * Creates a strongly-typed reactive form model
 *
 * @template T - The shape of your DTO/form data
 * @param fields - Partial field configurations
 * @returns Reactive ModelConfig
 *
 * @example
 * ```ts
 * interface LoginDto {
 *   email: string;
 *   password: string;
 * }
 *
 * const form = createModel<LoginDto>({
 *   email: {
 *     value: "",
 *     validations: [required(), email()]
 *   },
 *   password: {
 *     value: "",
 *     validations: [required(), minChars(8)]
 *   }
 * });
 * ```
 */
declare function createModel<T extends Record<string, any>>(fields: Partial<{
    [P in keyof T]: Partial<FieldConfig<T[P]>>;
}>): ModelConfig<T>;

export { createModel };
