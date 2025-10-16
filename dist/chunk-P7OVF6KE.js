// src/validators/date/range.ts
var dateRange = (minDate, maxDate, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate);
    const max = new Date(maxDate);
    if (isNaN(date.getTime()) || isNaN(min.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min || date > max) {
      return message || `Date must be between ${min.toDateString()} and ${max.toDateString()}`;
    }
    return "";
  };
};

export {
  dateRange
};
