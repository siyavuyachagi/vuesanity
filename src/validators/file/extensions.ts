
/**
 * Allowed file extension
 * @param { string | string[]} extensions List of allowed extensions
 * @param {string} message Custom error message (Optional)
 * @example
 * ```js
 * extensions([ "pdf","doxc","png" ],"File not supported!")
 * ```
 * OR
 * ```ts
 * extension("pdf","File not supported")
 * ```
 * @returns 
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