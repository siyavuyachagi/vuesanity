// src/validators/string/password.ts
var password = (message) => {
  return (value) => {
    if (!value) return "";
    const str = String(value);
    if (str.length < 6) {
      return message || "Password must be longer than 6 characters";
    }
    const lower = str.toLowerCase();
    if ([...lower].every((c) => c === lower[0])) {
      return "Password cannot consist of the same repeated character";
    }
    const specialPattern = /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/;
    if (!specialPattern.test(str)) {
      return message || "Password must include at least one special character";
    }
    return "";
  };
};

export {
  password
};
