// src/types/field-config.ts
import { ValidationRule } from "./validation-rule";

/**
 * FieldConfig represents a single form field with its value, validations, and errors.
 * 
 * IMPORTANT: Do NOT use primitive types (string, number, boolean) as the generic parameter T.
 * Primitive types do not satisfy the Record<string, any> constraint and will cause TypeScript errors.
 * 
 * For form fields with primitive values, use the non-generic `Field` interface instead.
 * Only use FieldConfig<T> when T is an object/interface type for nested structures.
 * 
 * @example
 * ```ts
 * import { required } from './validators';
 * 
 * // ❌ WRONG - Don't use primitives
 * const emailField: FieldConfig<string> = {
 *   value: '',
 *   validations: [required()]
 * };
 * 
* // ✅ Form with ModelConfig
* interface PollPostDto {
*   question: string;
*   options: string[];
*   expiresAt: string;
* }
* 
* const form = reactive<ModelConfig<PollPostDto>>({
*   question: { value: '', validations: [required(), maxChars(200)] },
*   options: { value: ['', ''], validations: [] },
*   expiresAt: { value: null, validations: [] }
* });
 * ```
 */
export interface FieldConfig<T = any> {
  value?: T;
  validations?: ValidationRule[];
  errors?: string[];
}

/**
 * Field is a non-generic version of FieldConfig used for form fields with primitive values.
 * 
 * This is the primary interface you should use when:
 * - Defining individual form fields in reactive forms
 * - Creating field properties in ModelConfig types
 * - Working with string, number, boolean, array, or other primitive values
 * - Avoiding TypeScript constraint errors with Record or mapped types
 * 
 * Use Field instead of FieldConfig<T> for all primitive types to avoid
 * "Type 'X' does not satisfy the constraint 'Record<string, any>'" errors.
 * 
 * @example
 * ```ts
 * import { reactive } from 'vue';
 * import { required, email, maxChars } from './validators';
 * 
 * // ✅ Individual fields with primitive values
 * const emailField: Field = { 
 *   value: '', 
 *   validations: [required(), email()],
 *   errors: []
 * };
 * 
 * const ageField: Field = {
 *   value: 0,
 *   validations: [required()]
 * };
 * 
 * const tagsField: Field = {
 *   value: [],
 *   validations: []
 * };
 * 
 * // ✅ Component props
 * const props = defineProps<{
 *   question: Field;
 *   description: Field | null;
 * }>();
 * 
 * // ✅ Access field values
 * console.log(form.question.value); // string
 * console.log(form.options.value);  // string[]
 * ```
 */
export interface Field {
  value?: any;
  errors?: string[];
  validations?: ValidationRule[];
}