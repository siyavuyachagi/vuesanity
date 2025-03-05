/**
 * Required
 * @param {string} message Error message (Optional)
 *
 */
declare const minlength: (message?: string) => (value: any) => string | null;

export { minlength };
