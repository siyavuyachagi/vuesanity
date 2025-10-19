// src/validators/file/file-extension.ts
/**
 * Allowed file extension validation
 * @param {string | string[]} extensions List of allowed extensions
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * fileExtension("pdf", "File not supported")
 * // Or
 * fileExtension(["pdf", "docx", "png"], "File not supported!")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const fileExtension = (
  extensions: string | string[],
  message?: string
): ((value: any) => string) => {
  const normalizedExtensions = (
    Array.isArray(extensions) ? extensions : [extensions]
  ).map((ext) => ext.toLowerCase().replace(/^\./, ""));

  return (value: any): string => {
    if (!value) return "";

    if (!(value instanceof File)) return "";

    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return "";
  };
};
