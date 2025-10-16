// src/validators/file/max-size.ts
/**
 * Maximum file size validation
 * @param {number} sizeMB Maximum file size in megabytes.
 * @param {string} message Error message (Optional)
 * @example
 * ```ts
 * maxSize(5, "File is too large!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const maxSize = (sizeMB: number, message?: string) => {
  return (value: any): string => {
    if (!value) return "";

    if (!(value instanceof File)) return "";

    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > sizeMB) {
      return message || `Maximum file size of ${sizeMB} MB exceeded.`;
    }
    return "";
  };
};