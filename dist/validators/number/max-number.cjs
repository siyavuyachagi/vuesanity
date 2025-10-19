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

// src/validators/number/max-number.ts
var max_number_exports = {};
__export(max_number_exports, {
  maxNumber: () => maxNumber
});
module.exports = __toCommonJS(max_number_exports);
var maxNumber = (max, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max) {
      return message || `Value cannot exceed ${max}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maxNumber
});
