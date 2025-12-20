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
export declare const fileExtension: (extensions: string | string[], message?: string) => ((value: any) => string);
