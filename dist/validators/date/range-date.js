// src/validators/date/range.ts
/**
 * Date range validation
 * @param {Date | string} minDate Minimum allowed date
 * @param {Date | string} maxDate Maximum allowed date
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * rangeDate(new Date("2024-01-01"), new Date("2024-12-31"))
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const rangeDate = (minDate, maxDate, message) => {
    return (value) => {
        if (!value)
            return "";
        const date = new Date(value);
        const min = new Date(minDate);
        const max = new Date(maxDate);
        if (isNaN(date.getTime()) ||
            isNaN(min.getTime()) ||
            isNaN(max.getTime())) {
            return message || "Invalid date format";
        }
        if (date < min || date > max) {
            return (message ||
                `Date must be between ${min.toDateString()} and ${max.toDateString()}`);
        }
        return "";
    };
};
