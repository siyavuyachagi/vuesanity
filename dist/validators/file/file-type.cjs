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

// src/validators/file/file-type.ts
var file_type_exports = {};
__export(file_type_exports, {
  fileType: () => fileType
});
module.exports = __toCommonJS(file_type_exports);
var fileType = (allowedTypes, message) => {
  const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    if (!types.includes(value.type)) {
      return message || `Invalid file type. Allowed types: ${types.join(", ")}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileType
});
