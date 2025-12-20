// src/validators/date/min.ts
/**
 * Minimum date validation
 * @param {Date | string} minDate Minimum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * minDate(new Date("2024-01-01"), "Date must be after 2024-01-01")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const minDate = (minDate, message) => {
    return (value) => {
        if (!value)
            return "";
        const date = new Date(value);
        const min = new Date(minDate);
        if (isNaN(date.getTime()) || isNaN(min.getTime())) {
            return message || "Invalid date format";
        }
        if (date < min) {
            return message || `Date must be after ${min.toDateString()}`;
        }
        return "";
    };
};
