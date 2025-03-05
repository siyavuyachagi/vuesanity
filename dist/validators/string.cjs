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

// src/validators/string.ts
var string_exports = {};
__export(string_exports, {
  email: () => email,
  length: () => length,
  maxLength: () => maxLength,
  minLength: () => minLength,
  phone: () => phone,
  required: () => required
});
module.exports = __toCommonJS(string_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  email,
  length,
  maxLength,
  minLength,
  phone,
  required
});
