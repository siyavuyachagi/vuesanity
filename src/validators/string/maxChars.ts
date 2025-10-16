/**
 * Maximum characters required.
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 * @returns
 */
export const maxChars = (length: number, message?: string) => {
    return (value: any): string | null => {
        if (!value) return null;

        if (value.length > length) {
            return message || `Maximum length of ${length} characters required`;
        }
        return null;
    };
};