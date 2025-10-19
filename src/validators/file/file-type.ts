// src/validators/file/file-type.ts
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
export const fileType = (
    allowedTypes: string[],
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";
        if (!(value instanceof File)) return "";

        if (!allowedTypes.includes(value.type)) {
            return message || `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`;
        }

        return "";
    };
};
