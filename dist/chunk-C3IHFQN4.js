// src/validators/string.ts
var email = (allowedDomains = [], message) => {
  return (value) => {
    if (!value) return null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return message || "Invalid email format";
    }
    const domain = value.split("@")[1];
    if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {
      return message || "Email domain is not allowed";
    }
    return null;
  };
};
var length = (length2, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length !== length2) {
      return message || `Number of characters required is ${length2}!`;
    }
    return null;
  };
};
var maxLength = (length2, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length > length2) {
      return message || `Maximum length of ${length2} characters required`;
    }
    return null;
  };
};
var minLength = (length2, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length < length2) {
      return message || `Minimum length of ${length2} characters required`;
    }
    return null;
  };
};
var phone = (locale, message) => {
  return (value) => {
    if (!value) return null;
    if (typeof value !== "string" && typeof value !== "number") {
      return message || "Invalid phone number!";
    }
    const phoneNumber = typeof value === "number" ? value.toString() : value;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(phoneNumber)) {
      return message || "Invalid phone number!";
    }
    return null;
  };
};
var required = (message = "This field is required!") => {
  return (value) => {
    if (value === null || value === void 0 || value === "") {
      return message;
    }
    if (typeof value === "string" && value.trim() === "") {
      return message;
    }
    return null;
  };
};
var sameAs = (compareValue, message) => {
  return (value) => {
    if (!value) return null;
    const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
    if (value !== valueToCompare) {
      return message || "Values don't match";
    }
    return null;
  };
};

export {
  email,
  length,
  maxLength,
  minLength,
  phone,
  required,
  sameAs
};
