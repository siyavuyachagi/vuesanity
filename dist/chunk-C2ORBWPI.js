// src/validators/string/password.ts
var password = (message) => {
  return (value) => {
    if (!value || String(value).length === 0) {
      return message || "Password must have 6 characters or more";
    }
    const str = String(value);
    if (str.length < 6) {
      return message || "Password must have 6 characters or more";
    }
    const lower = str.toLowerCase();
    if ([...lower].every((c) => c === lower[0])) {
      return "Password cannot consist of the same repeated character";
    }
    const specialPattern = /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/;
    if (!specialPattern.test(str)) {
      return message || "Password must include at least one special character";
    }
    return null;
  };
};

export {
  password
};
