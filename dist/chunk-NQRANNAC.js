// src/validators/number/max-number.ts
var maxNumber = (max, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max) {
      return message || `Value cannot exceed ${max}`;
    }
    return "";
  };
};

export {
  maxNumber
};
