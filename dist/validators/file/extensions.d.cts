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
declare const extensions: (extensions: string | string[], message?: string) => ((value: any) => string);

export { extensions };
