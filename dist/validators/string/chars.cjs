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

// src/validators/string/chars.ts
var chars_exports = {};
__export(chars_exports, {
  chars: () => chars
});
module.exports = __toCommonJS(chars_exports);
var chars = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length !== length) {
      return message || `Number of characters required is ${length}`;
    }
    return null;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  chars
});
