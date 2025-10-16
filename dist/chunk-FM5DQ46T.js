// src/validators/number/min.ts
var min = (min2, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min2) {
      return message || `Value must be at least ${min2}`;
    }
    return "";
  };
};

export {
  min
};
