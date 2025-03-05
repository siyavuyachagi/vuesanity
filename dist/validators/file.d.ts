/**
 * File extension
 * @param {string[]} extensions List of allowed extensions
 * @param {string} message Custom error message (Optional)
 * @example
 * ```js
 * extensions([ "pdf","doxc","png" ],"File not supported!")
 * ```
 */
declare const extensions: (extensions: string | string[], message?: string) => ((value: any) => string | null);
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
/**
 * File size validation
 * @param {number} length File size in ```megabytes```
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * size(5, "File size exceeds the limit!")
 * ```
 * @returns Validation function that returns error message or null
 */
declare const size: (length: number, message?: string) => ((value: any) => string | null);

export { extensions, maxSize, size };
