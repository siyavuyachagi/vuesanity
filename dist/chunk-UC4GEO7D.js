import {
  getAllCountryCodes,
  getCountryByISO
} from "./chunk-7WD7TX66.js";

// src/validators/string/phone.ts
var phone = (locale, message) => {
  return (value) => {
    if (!value) return "";
    if (typeof value !== "string" && typeof value !== "number") {
      return message || "Invalid phone number!";
    }
    const phoneNumber = typeof value === "number" ? value.toString() : value;
    if (locale) {
      const countryData = getCountryByISO(locale);
      if (!countryData) {
        return "Invalid country code";
      }
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      const countryCodeDigits = countryData.countryCode.replace(/\D/g, "");
      let nationalNumber = digitsOnly;
      if (digitsOnly.startsWith(countryCodeDigits)) {
        nationalNumber = digitsOnly.substring(countryCodeDigits.length);
      } else if (phoneNumber.startsWith("0") && countryData.hasLeadingZero) {
        nationalNumber = digitsOnly.substring(1);
      }
      if (nationalNumber.length < countryData.minLength) {
        return message || `Phone number too short for ${countryData.country}. Minimum: ${countryData.minLength} digits`;
      }
      if (nationalNumber.length > countryData.maxLength) {
        return message || `Phone number too long for ${countryData.country}. Maximum: ${countryData.maxLength} digits`;
      }
      return "";
    }
    const validCountryCodes = getAllCountryCodes();
    let isValidCountry = false;
    for (const code of validCountryCodes) {
      if (phoneNumber.startsWith(code)) {
        isValidCountry = true;
        break;
      }
    }
    const e164Pattern = /^\+?[1-9]\d{1,14}$/;
    if (!e164Pattern.test(phoneNumber)) {
      return message || "Invalid phone number format. Use E.164 format: +[country code][number]";
    }
    if (!isValidCountry && phoneNumber.startsWith("+")) {
      return message || "Invalid country code";
    }
    return "";
  };
};

export {
  phone
};
