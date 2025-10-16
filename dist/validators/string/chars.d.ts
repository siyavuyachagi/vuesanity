/**
 * Characters required.
 * @param {string[]} length Length of characters required.
 * @param {string} message Custom error message (Optional).
 * @return
 */
declare const chars: (length: number, message?: string) => ((value: any) => string | null);

export { chars };
