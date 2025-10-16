// src/validators/string/email.ts
var email = (domains = [], message) => {
  return (value) => {
    if (!value) return null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return message || "Invalid email format";
    }
    const domain = value.split("@")[1];
    if (domains.length > 0 && !domains.includes(domain)) {
      return message || "Email domain is not allowed";
    }
    return null;
  };
};
export {
  email
};
