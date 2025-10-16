// src/validators/string/phone.ts
/**
 * Phone number validation using E.164 format
 * @param {string} locale Locale for phone number validation (Optional, currently unused)
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const phone = (locale?: string, message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        if (typeof value !== "string" && typeof value !== "number") {
            return message || "Invalid phone number!";
        }

        const phoneNumber = typeof value === "number" ? value.toString() : value;
        const phonePattern = /^\+?[1-9]\d{1,14}$/;

        if (!phonePattern.test(phoneNumber)) {
            return message || "Invalid phone number!";
        }
        return "";
    };
};