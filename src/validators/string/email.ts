// src/validators/string/email.ts
/**
 * Email validation with domain restriction
 * @param {string[]} domains List of allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * email(["domain.com", "domain.co.za"], "Invalid email format");
 * // Or
 * email("domain.com", "Invalid email format");
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const email = (
    domains: string[] = [],
    message?: string
): ((value: any) => string) => {
    return (value: any): string => {
        if (!value) return "";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return message || "Invalid email format";
        }

        const domain = value.split("@")[1];
        if (domains.length > 0 && !domains.includes(domain)) {
            return message || "Email domain is not allowed";
        }

        return "";
    };
};