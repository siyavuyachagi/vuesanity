// src/validators/string/strict-phone.ts
import { getCountryByISO, validatePhoneByCountry } from "../../helpers/country-codes";

/**
 * Strict phone validator for specific country
 * Enforces country-specific formatting and length rules
 * 
 * @param {string} countryCode ISO country code (required)
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 * 
 * @example
 * ```ts
 * strictPhone('ZA', 'Invalid South African phone number')
 * '0639615361'   // valid - national format
 * '639615361'    // valid - without country code
 * '+27639615361' // valid - E.164 format
 * '123'          // invalid - too short
 * ```
 */
export const strictPhone = (countryCode: string, message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        if (typeof value !== "string" && typeof value !== "number") {
            return message || "Invalid phone number!";
        }

        let phoneNumber = typeof value === "number" ? value.toString() : value;

        const countryData = getCountryByISO(countryCode);

        if (!countryData) {
            return "Invalid country code";
        }

        // Handle national format (starts with 0) - only if country uses leading zero
        if (phoneNumber.startsWith('0') && countryData.hasLeadingZero) {
            phoneNumber = phoneNumber.substring(1);
        }

        const validation = validatePhoneByCountry(phoneNumber, countryCode);

        if (!validation.valid) {
            return message || `${countryData.country}: ${validation.error}`;
        }

        return "";
    };
};