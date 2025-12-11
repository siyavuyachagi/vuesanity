/**
 * DifferentFrom - Ensures a value is NOT equal to another value
 * @param {any | (() => any)} compareValue The value to compare against or getter function
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 *  differentFrom(() => model.oldPassword.value, "New password must be different")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const differentFrom: (compareValue: (() => any) | any, message?: string) => ((value: any) => string);

export { differentFrom };
