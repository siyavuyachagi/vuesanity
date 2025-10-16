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

        if (!(value instanceof File)) return null;

        const sizeInMB = value.size / (1024 * 1024); // Convert bytes to MB
        if (sizeInMB !== length) {
            return message || `File must be exactly ${length} MB in size.`;
        }
        return null;
    };
};