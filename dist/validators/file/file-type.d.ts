/**
 * ### File type validation
 * Use this validator to restrict allowed file types based on MIME types.
 * Supports exact MIME types, wildcards (e.g., 'image/*'), and shorthand notation (e.g., 'image').
 *
 * @param {string | string[]} allowedTypes Single MIME type or array of allowed MIME types
 * @param {string} [message] Custom error message (optional)
 * @example
 * ```ts
 * // Exact MIME type
 * fileType("image/png", "Invalid file type, only PNG allowed");
 *
 * // Multiple exact types
 * fileType(["image/png", "image/jpeg"], "Invalid file type, only PNG and JPEG allowed");
 *
 * // Wildcard - any image type
 * fileType("image/*", "Only image files allowed");
 *
 * // Shorthand - same as 'image/*'
 * fileType("image", "Only image files allowed");
 *
 * // Mix wildcards and exact types
 * fileType(["image/*", "application/pdf"], "Only images and PDFs allowed");
 * ```
 * @returns Validation function that returns error message or empty string
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export declare const fileType: (allowedTypes: string | string[], message?: string) => ((value: any) => string);
