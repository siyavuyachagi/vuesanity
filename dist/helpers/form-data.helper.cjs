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

// src/helpers/form-data.helper.ts
var form_data_helper_exports = {};
__export(form_data_helper_exports, {
  getFormData: () => getFormData
});
module.exports = __toCommonJS(form_data_helper_exports);
function getFormData(object) {
  const formData = new FormData();
  function processValue(value) {
    if (value && typeof value === "object" && "value" in value) {
      return value.value;
    }
    return value;
  }
  function appendToFormData(obj, prefix = "") {
    if (obj === null || obj === void 0) {
      return;
    }
    obj = processValue(obj);
    if (obj instanceof File) {
      formData.append(prefix, obj);
    } else if (Array.isArray(obj)) {
      if (obj.length > 0 && obj[0] instanceof File) {
        obj.forEach((file) => {
          formData.append(`${prefix}`, file);
        });
      } else {
        obj.forEach((item, index) => {
          appendToFormData(item, `${prefix}[${index}]`);
        });
      }
    } else if (typeof obj === "object" && !(obj instanceof File) && !(obj instanceof Blob) && !(obj instanceof Date)) {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}[${key}]` : key;
        appendToFormData(value, newPrefix);
      });
    } else if (obj instanceof Date) {
      formData.append(prefix, obj.toISOString());
    } else if (obj !== void 0) {
      formData.append(prefix, String(obj));
    }
  }
  appendToFormData(object);
  return formData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFormData
});
