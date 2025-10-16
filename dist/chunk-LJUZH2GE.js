// src/validators/number/max.ts
var max = (max2, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max2) {
      return message || `Value cannot exceed ${max2}`;
    }
    return "";
  };
};

export {
  max
};
