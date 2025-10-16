/**
 * Required
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const required: (message?: string) => (value: any) => string;

export { required };
