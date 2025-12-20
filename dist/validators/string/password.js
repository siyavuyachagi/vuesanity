/**
 * Password validation
 *
 * Rules:
 * - More than 5 characters
 * - Must include at least one special character
 * - Must NOT consist of the same repeated character (e.g., "AAAAAAA!")
 *
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or null
 */
export const password = (message) => {
    return (value) => {
        // If empty, it should fail validation
        if (!value || String(value).length === 0) {
            return message || "Password must have 6 characters or more";
        }
        const str = String(value);
        // Must be 6 characters or more
        if (str.length < 6) {
            return message || "Password must have 6 characters or more";
        }
        // Case-insensitive repeated character rule
        const lower = str.toLowerCase();
        if ([...lower].every(c => c === lower[0])) {
            return 'Password cannot consist of the same repeated character';
        }
        // Must contain at least one special character
        const specialPattern = /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/;
        if (!specialPattern.test(str)) {
            return message || "Password must include at least one special character";
        }
        return null; // success
    };
};
