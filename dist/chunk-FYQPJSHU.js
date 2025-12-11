// src/validators/string/different-from.ts
var differentFrom = (compareValue, message) => {
  return (value) => {
    if (!value) return "";
    const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
    if (value === valueToCompare) {
      return message || "Value must be different";
    }
    return "";
  };
};

export {
  differentFrom
};
