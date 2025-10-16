// src/validators/file/extensions.ts
/**
 * Allowed file extension validation
 * @param {string | string[]} extensions List of allowed extensions
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * extensions(["pdf", "docx", "png"], "File not supported!")
 * // Or
 * extensions("pdf", "File not supported")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const extensions = (
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
