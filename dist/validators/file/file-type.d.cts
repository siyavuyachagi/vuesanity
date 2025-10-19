/**
 * ### File type validation
 * Use this validator to restrict allowed file types based on MIME types.
 *
 * @param {string[]} allowedTypes Array of allowed MIME types
 * @param {string} [message] Custom error message (optional)
 * @example
 * ```ts
 * // Only allow PNG and JPEG images
 * fileType(["image/png", "image/jpeg"], "Only PNG/JPEG allowed");
 * ```
 * @returns Validation function that returns error message or empty string
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
declare const fileType: (allowedTypes: string[], message?: string) => ((value: any) => string);

export { fileType };
