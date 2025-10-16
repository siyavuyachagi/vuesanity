// src/validators/string/regex.ts
var regex = (pattern, message) => {
  return (value) => {
    if (!value) return "";
    if (!pattern.test(value)) {
      return message || "Value does not match the required pattern";
    }
    return "";
  };
};

export {
  regex
};
