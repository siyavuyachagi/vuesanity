// src/validators/string/numeric.ts
var numeric = (allowDecimals = false, allowNegative = false, message) => {
  return (value) => {
    if (!value) return "";
    let pattern;
    if (allowDecimals) {
      pattern = allowNegative ? /^-?\d+(\.\d+)?$/ : /^\d+(\.\d+)?$/;
    } else {
      pattern = allowNegative ? /^-?\d+$/ : /^\d+$/;
    }
    if (!pattern.test(String(value))) {
      return message || "Only numeric values are allowed";
    }
    return "";
  };
};

export {
  numeric
};
