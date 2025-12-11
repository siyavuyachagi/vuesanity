/**
 * Password validation
 *
 * Rules:
 * - More than 5 characters
 * - Must include at least one special character
 * - Must NOT consist of the same repeated character (e.g., "AAAAAAA!")
 *
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
declare const password: (message?: string) => ((value: any) => string);

export { password };
