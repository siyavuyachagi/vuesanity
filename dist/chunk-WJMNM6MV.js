// src/validators/boolean/must-be-false.ts
var mustBeFalse = (message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return null;
    const normalized = value === true ? true : value === false ? false : value === "true" ? true : value === "false" ? false : value === 1 ? true : value === 0 ? false : Boolean(value);
    if (normalized === true) {
      return message || "Value must be false";
    }
    return null;
  };
};

export {
  mustBeFalse
};
