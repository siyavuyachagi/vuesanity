/**
 * Validation types
 * @example
 * ```ts
 * // Example validation rule
 * const required = (message?: string): ValidationRule => {
 *   return (value: any) => {
 *     return value ? null : message || 'This field is required';
 *   };
 * };
 *
 * const minLength = (min: number): ValidationRule => {
 *   return (value: string) => {
 *     return value.length >= min ? null : `Minimum length is ${min} characters`;
 *   };
 * };
 *
 * // Usage
 * const validate = required();
 * console.log(validate('')); // "This field is required" - error
 * console.log(validate('hello')); // null - success
 * ```
 */
interface ValidationRule {
    (value: any): string | null;
}

export type { ValidationRule };
