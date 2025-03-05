/**
 * Required
 * @param {string} message Error message (Optional)
 *
 */
declare const extension: (message?: string) => (value: any) => string | null;

export { extension };
