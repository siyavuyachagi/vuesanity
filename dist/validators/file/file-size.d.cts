/**
 * Exact file size validation
 * @param {number} sizeMB File size in megabytes (exact match)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * fileSize(2, "File must be exactly 2 MB!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const fileSize: (sizeMB: number, message?: string) => ((value: any) => string);

export { fileSize };
