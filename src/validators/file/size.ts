// src/validators/file/size.ts
/**
 * Exact file size validation
 * @param {number} sizeMB File size in megabytes (exact match)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * size(2, "File must be exactly 2 MB!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const size = (
    sizeMB: number,
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";

        if (!(value instanceof File)) return "";

        const sizeInMB = value.size / (1024 * 1024);
        if (sizeInMB !== sizeMB) {
            return message || `File must be exactly ${sizeMB} MB in size.`;
        }
        return "";
    };
};
