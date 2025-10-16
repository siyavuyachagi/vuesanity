/**
 * Phone
 * @param {string} locale Locale for phone number validation (Optional)
 * @param {string} message Error message (Optional)
 * @returns {string | null} Error message if validation fails, otherwise null
 */
export const phone = (locale?: string, message?: string) => {
    return (value: any): string | null => {
        if (!value) return null;

        // Check if the value is a string or a number
        if (typeof value !== "string" && typeof value !== "number") {
            return message || "Invalid phone number!";
        }

        // Convert the value to a string if it's a number
        const phoneNumber = typeof value === "number" ? value.toString() : value;

        // Define a regex pattern for phone number validation
        const phonePattern = /^\+?[1-9]\d{1,14}$/;

        if (!phonePattern.test(phoneNumber)) {
            return message || "Invalid phone number!";
        }
        return null;
    };
};