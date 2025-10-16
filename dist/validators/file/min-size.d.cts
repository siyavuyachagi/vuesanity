/**
 * Minimum file size validation
 * @param {number} sizeMB Minimum file size in megabytes.
 * @param {string} message Error message (Optional)
 * @example
 * ```ts
 * minSize(0.1, "File is too small!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
declare const minSize: (sizeMB: number, message?: string) => (value: any) => string;

export { minSize };
