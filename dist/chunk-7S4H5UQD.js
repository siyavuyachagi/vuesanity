// src/validators/string/same-as.ts
var sameAs = (compareValue, message) => {
  return (value) => {
    if (!value) return "";
    const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
    if (value !== valueToCompare) {
      return message || "Values don't match";
    }
    return "";
  };
};

export {
  sameAs
};
