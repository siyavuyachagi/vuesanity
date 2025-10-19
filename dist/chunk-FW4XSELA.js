// src/validators/number/min-number.ts
var minNumber = (min, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min) {
      return message || `Value must be at least ${min}`;
    }
    return "";
  };
};

export {
  minNumber
};
