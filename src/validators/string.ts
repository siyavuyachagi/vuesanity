//region Email
/**
 * Email validation with domain restriction
 * @param {string[]} allowedDomains List of allowed email domains (Optional)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```
 * email([ "domain.com","domain.co.za" ],"Invalid email format")
 * ```
 * return
 */
export const email = (
  allowedDomains: string[] = [],
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

    // Check if the domain is in the allowedDomains list
    if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {
      return message || "Email domain is not allowed";
    }

    return null;
  };
};
//endregion

//region Length
/**
 * Length
 * @param {string[]} length Length of characters required.
 * @param {string} message Custom error message (Optional)
 * return
 */
export const length = (
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
//endregion

//region Maximum length
/**
 * Miximum length
 * @param {number} length Maximum length of characters required.
 * @param {string} message Error message (Optional)
 *
 */

export const maxLength = (length: number, message?: string) => {
  return (value: any): string | null => {
    if (!value) return null;

    if (value.length > length) {
      return message || `Maximum length of ${length} characters required`;
    }
    return null;
  };
};
//endregion

//region Minimum length
/**
 * MinLength
 * @param {number} length Minimum length of characters required.
 * @param {string} message Error message (Optional)
 *
 */

export const minLength = (length: number, message?: string) => {
  return (value: any): string | null => {
    if (!value) return null;

    if (value.length < length) {
      return message || `Minimum length of ${length} characters required`;
    }
    return null;
  };
};
//endregion

//region Phone
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
//endregion

//region Required
/**
 * Required
 * @param {string} message Error message (Optional)
 *
 */
export const required = (message: string = "This field is required!") => {
  return (value: any): string | null => {
    if (value === null || value === undefined || value === "") {
      return message;
    }
    if (typeof value === "string" && value.trim() === "") {
      return message;
    }
    return null;
  };
};
//endregion
