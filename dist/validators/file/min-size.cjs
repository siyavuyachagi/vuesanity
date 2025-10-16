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

// src/validators/file/min-size.ts
var min_size_exports = {};
__export(min_size_exports, {
  minSize: () => minSize
});
module.exports = __toCommonJS(min_size_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  minSize
});
