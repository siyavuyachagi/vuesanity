/**
 * SameAs - Compares two values for equality
 * @param {any} compareValue The value to compare against
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * // In your model configuration:
 * confirmPassword: {
 *   value: '',
 *   validations: [
 *     required(),
 *     sameAs(() => model.password.value, "Passwords don't match!")
 *   ],
 *   errors: []
 * }
 * ```
 * @returns Validation function that returns error message or null
 */
declare const sameAs: (compareValue: (() => any) | any, message?: string) => ((value: any) => string | null);

export { sameAs };
