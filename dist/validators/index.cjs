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

// src/validators/index.ts
var validators_exports = {};
__export(validators_exports, {
  alpha: () => alpha,
  alphanumeric: () => alphanumeric,
  chars: () => chars,
  dateRange: () => dateRange,
  email: () => email,
  extensions: () => extensions,
  image: () => image,
  max: () => max,
  maxChars: () => maxChars,
  maxDate: () => maxDate,
  maxSize: () => maxSize,
  min: () => min,
  minChars: () => minChars,
  minDate: () => minDate,
  minSize: () => minSize,
  numeric: () => numeric,
  phone: () => phone,
  range: () => range,
  regex: () => regex,
  required: () => required,
  sameAs: () => sameAs,
  size: () => size,
  url: () => url
});
module.exports = __toCommonJS(validators_exports);

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

// src/validators/file/extensions.ts
var extensions = (extensions2, message) => {
  const normalizedExtensions = (Array.isArray(extensions2) ? extensions2 : [extensions2]).map((ext) => ext.toLowerCase().replace(/^\./, ""));
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return "";
  };
};

// src/validators/file/max-size.ts
var maxSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > sizeMB) {
      return message || `Maximum file size of ${sizeMB} MB exceeded.`;
    }
    return "";
  };
};

// src/validators/file/min-size.ts
var minSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB < sizeMB) {
      return message || `Minimum file size of ${sizeMB} MB required.`;
    }
    return "";
  };
};

// src/validators/file/size.ts
var size = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB !== sizeMB) {
      return message || `File must be exactly ${sizeMB} MB in size.`;
    }
    return "";
  };
};

// src/validators/file/image.ts
var image = (message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];
    const imageMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/bmp",
      "image/svg+xml"
    ];
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1).toLowerCase();
    if (!imageExtensions.includes(extension) || !imageMimes.includes(value.type)) {
      return message || "File must be a valid image";
    }
    return "";
  };
};

// src/validators/number/min.ts
var min = (min2, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min2) {
      return message || `Value must be at least ${min2}`;
    }
    return "";
  };
};

// src/validators/number/max.ts
var max = (max2, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max2) {
      return message || `Value cannot exceed ${max2}`;
    }
    return "";
  };
};

// src/validators/number/range.ts
var range = (min2, max2, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min2 || numValue > max2) {
      return message || `Value must be between ${min2} and ${max2}`;
    }
    return "";
  };
};

// src/validators/date/min.ts
var minDate = (minDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min2 = new Date(minDate2);
    if (isNaN(date.getTime()) || isNaN(min2.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min2) {
      return message || `Date must be after ${min2.toDateString()}`;
    }
    return "";
  };
};

// src/validators/date/max.ts
var maxDate = (maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const max2 = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(max2.getTime())) {
      return message || "Invalid date format";
    }
    if (date > max2) {
      return message || `Date must be before ${max2.toDateString()}`;
    }
    return "";
  };
};

// src/validators/date/range.ts
var dateRange = (minDate2, maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min2 = new Date(minDate2);
    const max2 = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(min2.getTime()) || isNaN(max2.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min2 || date > max2) {
      return message || `Date must be between ${min2.toDateString()} and ${max2.toDateString()}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alpha,
  alphanumeric,
  chars,
  dateRange,
  email,
  extensions,
  image,
  max,
  maxChars,
  maxDate,
  maxSize,
  min,
  minChars,
  minDate,
  minSize,
  numeric,
  phone,
  range,
  regex,
  required,
  sameAs,
  size,
  url
});
