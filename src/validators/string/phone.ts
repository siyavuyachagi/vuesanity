// src/validators/string/phone.ts
import { getCountryByISO, getAllCountryCodes } from '../../helpers/country-codes'

/**
 * Phone number validation with optional country-specific validation
 * 
 * @param {string} locale ISO country code (e.g., 'ZA', 'US', 'GB') for country-specific validation
 * @param {string} message Custom error message (Optional)
 * @returns Validation function that returns error message or empty string
 * 
 * @example
 * ```ts
 * // Generic E.164 validation
 * phone()
 * 
 * // South Africa specific (9-digit national number)
 * phone('ZA', 'Invalid South African phone number')
 * 
 * // US specific (10-digit)
 * phone('US')
 * ```
 */
export const phone = (locale?: string, message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        if (typeof value !== "string" && typeof value !== "number") {
            return message || "Invalid phone number!";
        }

        const phoneNumber = typeof value === "number" ? value.toString() : value;

        // If locale provided, validate against country-specific rules
        if (locale) {
            const countryData = getCountryByISO(locale);

            if (!countryData) {
                return "Invalid country code";
            }

            // Extract only digits
            const digitsOnly = phoneNumber.replace(/\D/g, '');
            const countryCodeDigits = countryData.countryCode.replace(/\D/g, '');

            // Determine national number based on format
            let nationalNumber = digitsOnly;

            // If number starts with country code, remove it
            if (digitsOnly.startsWith(countryCodeDigits)) {
                nationalNumber = digitsOnly.substring(countryCodeDigits.length);
            }
            // If number starts with 0 (national format with leading zero), remove it if country has leading zero
            else if (phoneNumber.startsWith('0') && countryData.hasLeadingZero) {
                nationalNumber = digitsOnly.substring(1);
            }

            // Validate length of national number
            if (nationalNumber.length < countryData.minLength) {
                return message || `Phone number too short for ${countryData.country}. Minimum: ${countryData.minLength} digits`;
            }

            if (nationalNumber.length > countryData.maxLength) {
                return message || `Phone number too long for ${countryData.country}. Maximum: ${countryData.maxLength} digits`;
            }

            return "";
        }

        // Generic E.164 validation (no country specified)
        const validCountryCodes = getAllCountryCodes();
        let isValidCountry = false;

        // Check if starts with valid country code
        for (const code of validCountryCodes) {
            if (phoneNumber.startsWith(code)) {
                isValidCountry = true;
                break;
            }
        }

        // E.164 format: +[1-9]{1,3}[0-9]{1,14}
        const e164Pattern = /^\+?[1-9]\d{1,14}$/;

        if (!e164Pattern.test(phoneNumber)) {
            return message || "Invalid phone number format. Use E.164 format: +[country code][number]";
        }

        if (!isValidCountry && phoneNumber.startsWith('+')) {
            return message || "Invalid country code";
        }

        return "";
    };
};