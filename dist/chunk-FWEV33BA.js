// src/validators/string/alphanumeric.ts
var alphanumeric = (allowSpaces = false, message) => {
  return (value) => {
    if (!value) return null;
    const pattern = allowSpaces ? /^[a-zA-Z0-9\s]*$/ : /^[a-zA-Z0-9]*$/;
    if (!pattern.test(value)) {
      return message || "Only alphanumeric characters are allowed";
    }
    return null;
  };
};

export {
  alphanumeric
};
