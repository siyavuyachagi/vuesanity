/**
 * Image file validation (checks extension and mime type)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * image("Please upload a valid image")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const image: (message?: string) => (value: any) => string;

export { image };
