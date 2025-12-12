import { FieldConfig } from './field-config.js';
import './validation-rule.js';

/**
 * ModelConfig is a dictionary of field configurations.
 * @example
 * ```ts
 * import { reactive } from 'vue';
 * import { required, email } from './validators';
 *
 * interface RegisterDto {
 *     firstName: string;
 *     lastName: string;
 *     email: string;
 *     password: string;
 * }
 *
 * const model = reactive<ModelConfig<RegisterDto>>({
 *     firstName: {
 *         value: '',
 *         validations: [required()],
 *         errors: []
 *     },
 *     email: {
 *         value: '',
 *         validations: [required(), email()],
 *         errors: []
 *     }
 * });
 *
 * // Usage
 * model.firstName.value = 'Siyavuya'; // Reactive!
 * ```
 */
type ModelConfig<T extends Record<string, any>> = {
    [P in keyof T]?: FieldConfig<T[P]>;
};

export type { ModelConfig };
