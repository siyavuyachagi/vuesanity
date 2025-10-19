// src/validators/date/max-date.ts
var maxDate = (maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const max = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date > max) {
      return message || `Date must be before ${max.toDateString()}`;
    }
    return "";
  };
};

export {
  maxDate
};
