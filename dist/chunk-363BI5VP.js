// src/validators/string/alpha.ts
var alpha = (allowSpaces = true, message) => {
  return (value) => {
    if (!value) return "";
    const pattern = allowSpaces ? /^[a-zA-Z\s]*$/ : /^[a-zA-Z]*$/;
    if (!pattern.test(value)) {
      return message || "Only alphabetic characters are allowed";
    }
    return "";
  };
};

export {
  alpha
};
