/**
 * Required
 * @param {string} message Error message (Optional)
 *
 */
declare const required: (message?: string) => (value: any) => string | null;

export { required };
