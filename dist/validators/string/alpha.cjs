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

// src/validators/string/alpha.ts
var alpha_exports = {};
__export(alpha_exports, {
  alpha: () => alpha
});
module.exports = __toCommonJS(alpha_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alpha
});
