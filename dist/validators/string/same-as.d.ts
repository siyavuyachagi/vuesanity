/**
 * SameAs - Compares two values for equality
 * @param {any | (() => any)} compareValue The value to compare against or getter function
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 *  sameAs(() => model.password.value, "Passwords don't match!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const sameAs: (compareValue: (() => any) | any, message?: string) => ((value: any) => string);

export { sameAs };
