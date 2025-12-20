/**
 * Minimum file size validation
 * @param {number} sizeMB Minimum file size in megabytes.
 * @param {string} message Error message (Optional)
 * @example
 * ```ts
 * minFileSize(0.1, "File is too small!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export declare const minFileSize: (sizeMB: number, message?: string) => (value: any) => string;
