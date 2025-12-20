// src/validators/file/file-type.ts
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
export const fileType = (allowedTypes, message) => {
    // Normalize to array to handle both string and string[] inputs
    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
    return (value) => {
        if (!value)
            return "";
        if (!(value instanceof File))
            return "";
        const fileType = value.type;
        const isAllowed = types.some(allowedType => {
            // Handle wildcard patterns like 'image/*' or just 'image'
            if (allowedType.includes('*')) {
                const prefix = allowedType.split('/')[0];
                return fileType.startsWith(prefix + '/');
            }
            // Handle shorthand like 'image' (treat as 'image/*')
            if (!allowedType.includes('/')) {
                return fileType.startsWith(allowedType + '/');
            }
            // Exact match
            return fileType === allowedType;
        });
        if (!isAllowed) {
            return message || `Invalid file type. Allowed types: ${types.join(", ")}`;
        }
        return "";
    };
};
