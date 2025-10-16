/**
 * Email validation with domain restriction
 * @param {string[]} domains List of allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * email([ "domain.com","domain.co.za" ],"Invalid email format");
 * //Or
 * email("domain.com","Invalid email format");
 * ```
 * return
 */
export const email = (
    domains: string[] = [],
    message?: string
): ((value: any) => string | null) => {
    return (value: any): string | null => {
        if (!value) return null; // value is null

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return message || "Invalid email format";
        }

        // Extract the domain part of the email
        const domain = value.split("@")[1];

        // Check if the domain is in the domains list
        if (domains.length > 0 && !domains.includes(domain)) {
            return message || "Email domain is not allowed";
        }

        return null;
    };
};