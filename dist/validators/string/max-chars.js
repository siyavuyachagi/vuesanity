// src/validators/string/max-chars.ts
var maxChars = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length > length) {
      return message || `Maximum length of ${length} characters required`;
    }
    return null;
  };
};
export {
  maxChars
};
