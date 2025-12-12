// src/validators/string/email.ts

import { ValidationRule } from "~/src/types";

/**
 * Email validation with domain restriction
 * @param {string | string[]} allowedDomains Allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * email("domain.com", "Invalid email format");
 * // Or
 * email(["domain.com", "domain.co.za"], "Invalid email format");
 * ```
 * @returns Validation function that returns error message or null
 */
export const email = (
    allowedDomains?: string | string[],
    message?: string
): ValidationRule => {
    // Normalize allowed domains to an array for easier checking
    const domains = Array.isArray(allowedDomains)
        ? allowedDomains
        : allowedDomains
            ? [allowedDomains]
            : [];

    return (value: any): string | null => {
        if (!value) return null;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return message || "Invalid email format";
        }

        const domain = value.split("@")[1].toLowerCase();
        if (domains.length > 0 && !domains.map(d => d.toLowerCase()).includes(domain)) {
            return message || `Email domain must be one of: ${domains.join(", ")}`;
        }

        return null;
    };
};
