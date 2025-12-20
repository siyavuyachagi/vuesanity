import { FieldConfig } from "./field-config";

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
export type ModelConfig<T extends Record<string, any>> = Partial<{
  [P in keyof T]: FieldConfig<T[P]>;
}>;

