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

// src/validators/string/numeric.ts
var numeric_exports = {};
__export(numeric_exports, {
  numeric: () => numeric
});
module.exports = __toCommonJS(numeric_exports);
var numeric = (allowDecimals = false, allowNegative = false, message) => {
  return (value) => {
    if (!value) return "";
    let pattern;
    if (allowDecimals) {
      pattern = allowNegative ? /^-?\d+(\.\d+)?$/ : /^\d+(\.\d+)?$/;
    } else {
      pattern = allowNegative ? /^-?\d+$/ : /^\d+$/;
    }
    if (!pattern.test(String(value))) {
      return message || "Only numeric values are allowed";
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  numeric
});
