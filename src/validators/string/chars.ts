/**
 * Characters required.
 * @param {string[]} length Length of characters required.
 * @param {string} message Custom error message (Optional).
 * @return
 */
export const chars = (
    length: number,
    message?: string
): ((value: any) => string | null) => {
    return (value: any): string | null => {
        if (!value) return null; // value is null

        if (value.length !== length) {
            return message || `Number of characters required is ${length}!`;
        }
        return null;
    };
};