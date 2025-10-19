// src/validators/number/range-number.ts
var rangeNumber = (min, max, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      return message || `Value must be between ${min} and ${max}`;
    }
    return "";
  };
};

export {
  rangeNumber
};
