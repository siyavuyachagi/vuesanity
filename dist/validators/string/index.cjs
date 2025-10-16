"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/validators/string/index.ts
var string_exports = {};
__export(string_exports, {
  alpha: () => alpha,
  alphanumeric: () => alphanumeric,
  chars: () => chars,
  email: () => email,
  maxChars: () => maxChars,
  minChars: () => minChars,
  numeric: () => numeric,
  phone: () => phone,
  regex: () => regex,
  required: () => required,
  sameAs: () => sameAs,
  url: () => url
});
module.exports = __toCommonJS(string_exports);

// src/validators/string/required.ts
var required = (message = "This field is required!") => {
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

// src/validators/string/email.ts
var email = (domains = [], message) => {
  return (value) => {
    if (!value) return "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return message || "Invalid email format";
    }
    const domain = value.split("@")[1];
    if (domains.length > 0 && !domains.includes(domain)) {
      return message || "Email domain is not allowed";
    }
    return "";
  };
};

// src/validators/string/min-chars.ts
var minChars = (length, message) => {
  return (value) => {
    if (!value) return "";
    if (value.length < length) {
      return message || `Minimum length of ${length} characters required`;
    }
    return "";
  };
};

// src/validators/string/max-chars.ts
var maxChars = (length, message) => {
  return (value) => {
    if (!value) return "";
    if (value.length > length) {
      return message || `Maximum length of ${length} characters required`;
    }
    return "";
  };
};

// src/validators/string/chars.ts
var chars = (length, message) => {
  return (value) => {
    if (!value) return "";
    if (value.length !== length) {
      return message || `Number of characters required is ${length}!`;
    }
    return "";
  };
};

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

// src/validators/string/same-as.ts
var sameAs = (compareValue, message) => {
  return (value) => {
    if (!value) return "";
    const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
    if (value !== valueToCompare) {
      return message || "Values don't match";
    }
    return "";
  };
};

// src/validators/string/url.ts
var url = (message) => {
  return (value) => {
    if (!value) return "";
    try {
      new URL(value);
      return "";
    } catch {
      return message || "Invalid URL format";
    }
  };
};

// src/validators/string/regex.ts
var regex = (pattern, message) => {
  return (value) => {
    if (!value) return "";
    if (!pattern.test(value)) {
      return message || "Value does not match the required pattern";
    }
    return "";
  };
};

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

// src/validators/string/alphanumeric.ts
var alphanumeric = (allowSpaces = false, message) => {
  return (value) => {
    if (!value) return "";
    const pattern = allowSpaces ? /^[a-zA-Z0-9\s]*$/ : /^[a-zA-Z0-9]*$/;
    if (!pattern.test(value)) {
      return message || "Only alphanumeric characters are allowed";
    }
    return "";
  };
};

// src/validators/string/numeric.ts
var numeric = (allowDecimals = false, allowNegative = false, message) => {
  return (value) => {
    if (!value) return "";
    let pattern = allowNegative ? /^-?\d+/ : /^\d+/;
    if (allowDecimals) {
      pattern = allowNegative ? /^-?\d+\.?\d*$/ : /^\d+\.?\d*$/;
    }
    if (!pattern.test(String(value))) {
      return message || "Only numeric values are allowed";
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alpha,
  alphanumeric,
  chars,
  email,
  maxChars,
  minChars,
  numeric,
  phone,
  regex,
  required,
  sameAs,
  url
});
