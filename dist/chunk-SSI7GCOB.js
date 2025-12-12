// src/validators/string/min-chars.ts
var minChars = (length, message) => {
  return (value) => {
    const str = String(value);
    if (str.length < length) {
      return message || `Minimum length of ${length} characters required`;
    }
    return null;
  };
};

export {
  minChars
};
