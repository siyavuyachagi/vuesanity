// src/validators/file/min-file-size.ts
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
export const minFileSize = (sizeMB: number, message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        if (!(value instanceof File)) return "";

        const sizeInMB = value.size / (1024 * 1024);
        if (sizeInMB < sizeMB) {
            return message || `Minimum file size of ${sizeMB} MB required.`;
        }
        return "";
    };
};