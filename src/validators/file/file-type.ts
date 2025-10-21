// src/validators/file/file-type.ts
/**
 * ### File type validation
 * Use this validator to restrict allowed file types based on MIME types.
 * 
 * @param {string | string[]} allowedTypes Single MIME type or array of allowed MIME types
 * @param {string} [message] Custom error message (optional)
 * @example
 * ```ts
 * // Single type as string
 * fileType("image/png", "Invalid file type, only PNG allowed");
 * // Multiple types as array
 * fileType(["image/png", "image/jpeg"], "Invalid file type, only PNG and JPEG allowed");
 * ```
 * @returns Validation function that returns error message or empty string
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export const fileType = (
    allowedTypes: string | string[],
    message?: string
): ((value: any) => string) => {
    // Normalize to array to handle both string and string[] inputs
    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];

    return (value: any): string => {
        if (!value) return "";
        if (!(value instanceof File)) return "";

        if (!types.includes(value.type)) {
            return message || `Invalid file type. Allowed types: ${types.join(", ")}`;
        }

        return "";
    };
};