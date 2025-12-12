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

// src/validators/boolean/index.ts
var boolean_exports = {};
__export(boolean_exports, {
  mustBeFalse: () => mustBeFalse,
  mustBeTrue: () => mustBeTrue
});
module.exports = __toCommonJS(boolean_exports);

// src/validators/boolean/must-be-false.ts
var mustBeFalse = (message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return null;
    const normalized = value === true ? true : value === false ? false : value === "true" ? true : value === "false" ? false : value === 1 ? true : value === 0 ? false : Boolean(value);
    if (normalized === true) {
      return message || "Value must be false";
    }
    return null;
  };
};

// src/validators/boolean/must-be-true.ts
var mustBeTrue = (message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return null;
    const normalized = value === true ? true : value === false ? false : value === "true" ? true : value === "false" ? false : value === 1 ? true : value === 0 ? false : Boolean(value);
    if (normalized === false) {
      return message || "Value must be true";
    }
    return null;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mustBeFalse,
  mustBeTrue
});
