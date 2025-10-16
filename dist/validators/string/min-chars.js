// src/validators/string/min-chars.ts
var minChars = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length < length) {
      return message || `Minimum length of ${length} characters required`;
    }
    return null;
  };
};
export {
  minChars
};
