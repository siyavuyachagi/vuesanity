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
declare const extensions: (extensions: string | string[], message?: string) => ((value: any) => string | null);

export { extensions };
