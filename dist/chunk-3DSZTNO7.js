// src/validators/date/min-date.ts
var minDate = (minDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate2);
    if (isNaN(date.getTime()) || isNaN(min.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min) {
      return message || `Date must be after ${min.toDateString()}`;
    }
    return "";
  };
};

export {
  minDate
};
