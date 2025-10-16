// src/validators/string/chars.ts
var chars = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length !== length) {
      return message || `Number of characters required is ${length}!`;
    }
    return null;
  };
};
export {
  chars
};
