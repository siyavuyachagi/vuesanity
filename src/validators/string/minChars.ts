/**
 * Minimum characters required.
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (optional).
 * @returns 
 */
export const minChars = (length: number, message?: string) => {
    return (value: any): string | null => {
        if (!value) return null;

        if (value.length < length) {
            return message || `Minimum length of ${length} characters required`;
        }
        return null;
    };
};