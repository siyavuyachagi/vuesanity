// src/validators/string/required.ts
var required = (message = "This field is required") => {
  return (value) => {
    if (value === null || value === void 0 || value === "") {
      return message;
    }
    if (typeof value === "string" && value.trim() === "") {
      return message;
    }
    return "";
  };
};

export {
  required
};
