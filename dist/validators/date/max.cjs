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

// src/validators/date/max.ts
var max_exports = {};
__export(max_exports, {
  maxDate: () => maxDate
});
module.exports = __toCommonJS(max_exports);
var maxDate = (maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const max = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date > max) {
      return message || `Date must be before ${max.toDateString()}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maxDate
});
