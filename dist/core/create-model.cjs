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

// src/core/create-model.ts
var create_model_exports = {};
__export(create_model_exports, {
  createModel: () => createModel
});
module.exports = __toCommonJS(create_model_exports);
var import_vue = require("vue");
function createModel(fields) {
  const model = {};
  for (const key in fields) {
    model[key] = {
      value: fields[key]?.value ?? "",
      validations: fields[key]?.validations ?? [],
      errors: fields[key]?.errors ?? []
    };
  }
  return (0, import_vue.reactive)(model);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createModel
});
