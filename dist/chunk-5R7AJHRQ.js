// src/validators/string/phone.ts
var phone = (locale, message) => {
  return (value) => {
    if (!value) return "";
    if (typeof value !== "string" && typeof value !== "number") {
      return message || "Invalid phone number!";
    }
    const phoneNumber = typeof value === "number" ? value.toString() : value;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(phoneNumber)) {
      return message || "Invalid phone number!";
    }
    return "";
  };
};

export {
  phone
};
