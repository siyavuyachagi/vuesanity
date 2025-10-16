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



export const maxSize = (size: number, message?: string) => {
  return (value: any): string | null => {
    if (!value) return null;

    if (!(value instanceof File)) return null;

    const sizeInMB = value.size / (1024 * 1024); // Convert bytes to MB
    if (sizeInMB > size) {
      return message || `Maximum file size of ${size} MB exceeded.`;
    }
    return null;
  };
};