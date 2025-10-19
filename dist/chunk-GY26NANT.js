// src/validators/string/email.ts
var email = (allowedDomains, message) => {
  const domains = Array.isArray(allowedDomains) ? allowedDomains : allowedDomains ? [allowedDomains] : [];
  return (value) => {
    if (!value) return "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return message || "Invalid email format";
    }
    const domain = value.split("@")[1].toLowerCase();
    if (domains.length > 0 && !domains.map((d) => d.toLowerCase()).includes(domain)) {
      return message || `Email domain must be one of: ${domains.join(", ")}`;
    }
    return "";
  };
};

export {
  email
};
