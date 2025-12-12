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

// src/core/vuesanity.ts
var vuesanity_exports = {};
__export(vuesanity_exports, {
  default: () => VueSanity
});
module.exports = __toCommonJS(vuesanity_exports);
var import_vue = require("vue");

// src/helpers/form-data.ts
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

// src/core/vuesanity.ts
var VueSanity = class {
  /** Reactive model configuration */
  _model;
  /** Should form values be cleared after successful validation */
  _cleanValues;
  /** Validation errors keyed by field */
  errors = {};
  /** Form validation status */
  isValid = false;
  /** Normalized, validated form payload */
  normalizedModel = {};
  /** FormData representation of the validated model */
  formData = new FormData();
  /** Static helper to convert object to FormData */
  static getFormData = getFormData;
  /**
   * Constructor
   * @param modelConfig - The strongly-typed form model configuration
   * @param cleanValues - Automatically clear values after successful validation (default: true)
   */
  constructor(modelConfig, cleanValues = true) {
    this._model = (0, import_vue.reactive)(modelConfig);
    this._cleanValues = cleanValues;
    this._validate();
  }
  /** Perform validations for all fields and update state */
  _validate() {
    let valid = true;
    this._clearModelErrors();
    for (const key in this._model) {
      const field = this._model[key];
      if (!field || !field.validations) continue;
      if (!field.errors) {
        field.errors = [];
      }
      const fieldErrors = [];
      if (Array.isArray(field.value)) {
        field.value.forEach((item) => {
          field.validations.forEach((validator) => {
            const error = validator(item);
            if (error) fieldErrors.push(error);
          });
        });
      } else {
        field.validations.forEach((validator) => {
          const error = validator(field.value);
          if (error) fieldErrors.push(error);
        });
      }
      if (fieldErrors.length > 0) {
        valid = false;
        field.errors.push(...fieldErrors);
        this.errors[key] = [...fieldErrors];
      }
    }
    this.isValid = valid;
    this._normalizeModel();
  }
  /**
   * Normalizes the data model
   */
  _normalizeModel() {
    if (!this.isValid) {
      this.normalizedModel = {};
    } else {
      const result = {};
      for (const key in this._model) {
        const field = this._model[key];
        if (field && (!field.errors || field.errors.length === 0) && field.value !== void 0) {
          result[key] = field.value;
        }
      }
      this.normalizedModel = result;
      this.formData = new FormData();
      for (const key in this._model) {
        const field = this._model[key];
        if (!field) continue;
        const values = this._toArray(field.value);
        for (const val of values) {
          if (val !== null && val !== void 0) {
            this.formData.append(key, val);
          }
        }
      }
      this._deconstructor();
    }
  }
  _toArray(val) {
    if (val === void 0 || val === null) return [];
    return Array.isArray(val) ? val : [val];
  }
  /** Reset all model field errors */
  _clearModelErrors() {
    for (const key in this._model) {
      const field = this._model[key];
      if (field) field.errors = [];
    }
    this.errors = {};
  }
  /** Optionally clear all model field values */
  _clearModelValues() {
    for (const key in this._model) {
      const field = this._model[key];
      if (!field) continue;
      if (field.value !== void 0) {
        if (Array.isArray(field.value)) {
          field.value.splice(0);
        } else {
          field.value = void 0;
        }
      }
    }
  }
  /** Clean-up method called after successful validation */
  _deconstructor() {
    if (!this._model) return;
    if (this._cleanValues && this.isValid) this._clearModelValues();
    this._clearModelErrors();
  }
};
