/**
 * Maximum file size validation
 * @param {number} sizeMB Maximum file size in megabytes.
 * @param {string} message Error message (Optional)
 * @example
 * ```ts
 * maxFileSize(5, "File is too large!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const maxFileSize: (sizeMB: number, message?: string) => (value: any) => string;

export { maxFileSize };
