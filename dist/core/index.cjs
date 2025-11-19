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

// src/core/index.ts
var core_exports = {};
__export(core_exports, {
  VueSanity: () => VueSanity,
  getFormData: () => getFormData
});
module.exports = __toCommonJS(core_exports);

// src/core/vuesanity.ts
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
  // private fields
  _model;
  _cleanValues;
  // Public fields
  errors = {};
  isValid = false;
  normalizedModel = (0, import_vue.ref)({});
  formData = new FormData();
  // Static method to convert object to FormData: Accessible via VueSanity.getFormData()
  static getFormData = getFormData;
  // Constructor
  constructor(modelConfig, cleanValues = true) {
    this._model = (0, import_vue.reactive)(modelConfig);
    this._cleanValues = cleanValues;
    this._validate();
  }
  /** Main initial validation method */
  _validate() {
    let isValid = true;
    this._clearModelErrors();
    Object.entries(this._model).forEach(([key, field]) => {
      if (field.validations) {
        field.validations.forEach((validation) => {
          const fieldErrors = [];
          if (Array.isArray(field.value)) {
            Array.from(field.value).forEach((value) => {
              const error = validation(value);
              if (error) {
                fieldErrors.push(error);
              }
            });
          } else {
            const error = validation(field.value);
            if (error) {
              fieldErrors.push(error);
            }
          }
          if (fieldErrors.length > 0 && !this.errors[key]) {
            this.errors[key] = [];
            this.errors[key].push(...fieldErrors);
          }
          if (fieldErrors.length > 0) {
            field.errors.push(...fieldErrors);
            isValid = false;
          }
        });
      }
    });
    this.isValid = isValid;
    if (!isValid) {
      this.normalizedModel = {};
    } else {
      this.normalizedModel = Object.entries(this._model).reduce(
        (acc, [key, field]) => {
          if (!field.errors || field.errors.length === 0) {
            acc[key] = field.value;
          }
          return acc;
        },
        {}
      );
      Object.entries(this._model).forEach(([key, field]) => {
        if (Array.isArray(field.value)) {
          Array.from(field.value).forEach((value) => {
            if (value) this.formData.append(key, value);
          });
        } else {
          if (field.value) this.formData.append(key, field.value);
        }
      });
      this._deconstructor();
    }
  }
  /** Clean model errors after validations */
  _clearModelErrors = () => {
    Object.entries(this._model).forEach(([key, field]) => {
      field.errors = [];
    });
  };
  /** Optionally clean model values after successful validations */
  _clearModelValues = () => {
    Object.keys(this._model).forEach((field) => {
      if (this._model[field]) {
        if (this._model[field].value !== void 0) {
          if (Array.isArray(this._model[field].value))
            Array.from(this._model[field].value).splice(0);
          else this._model[field].value = null;
        }
      }
    });
  };
  /** Deconstructor */
  _deconstructor = () => {
    if (!this._model) return;
    if (this._cleanValues && this.isValid) this._clearModelValues();
    this._clearModelErrors();
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VueSanity,
  getFormData
});
