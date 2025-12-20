// src/validators/date/max.ts
/**
 * Maximum date validation
 * @param {Date | string} maxDate Maximum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * maxDate(new Date(), "Date cannot be in the future")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const maxDate = (maxDate, message) => {
    return (value) => {
        if (!value)
            return "";
        const date = new Date(value);
        const max = new Date(maxDate);
        if (isNaN(date.getTime()) || isNaN(max.getTime())) {
            return message || "Invalid date format";
        }
        if (date > max) {
            return message || `Date must be before ${max.toDateString()}`;
        }
        return "";
    };
};
