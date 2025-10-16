/**
 * Maximum file size
 * @param {number} size Maximum file size in megabytes.
 * @param {string} message Error message (Optional)
 * @example
 * ```ts
 * maxSize(5, "File is too large!")
 * ```
 * @returns Validation function that returns error message or null
 */
declare const maxSize: (size: number, message?: string) => (value: any) => string | null;

export { maxSize };
