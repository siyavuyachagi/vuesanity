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

// src/validators/string/password.ts
var password_exports = {};
__export(password_exports, {
  password: () => password
});
module.exports = __toCommonJS(password_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  password
});
