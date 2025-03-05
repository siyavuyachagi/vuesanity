//region File extension
/**
 * File extension
 * @param {string[]} extensions List of allowed extensions
 * @param {string} message Custom error message (Optional)
 * @example
 * ```js
 * extensions([ "pdf","doxc","png" ],"File not supported!")
 * ```
 */
export const extensions = (
  extensions: string | string[],
  message?: string
): ((value: any) => string | null) => {
  // Normalize extensions array and remove dots if present
  const normalizedExtensions = (
    Array.isArray(extensions) ? extensions : [extensions]
  ).map((ext) => ext.toLowerCase().replace(/^\./, ""));

  return (value: any): string | null => {
    if (!value) return null; // value is null

    if (!(value instanceof File)) return null;

    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return null;
  };
};
//endregion

//region Maximum file size
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
//endregion


//region File size
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

export const size = (
  length: number,
  message?: string
): ((value: any) => string | null) => {
  return (value: any): string | null => {
    if (!value) return null; // value is null

    return null;
  };
};
//endregion