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

// src/validators/minlength.ts
var minlength_exports = {};
__export(minlength_exports, {
  minlength: () => minlength
});
module.exports = __toCommonJS(minlength_exports);
var minlength = (message = "This field is required!") => {
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
  minlength
});
