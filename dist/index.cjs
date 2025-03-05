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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => VueSanity,
  email: () => email,
  extensions: () => extensions,
  length: () => length,
  maxLength: () => maxLength,
  maxSize: () => maxSize,
  minLength: () => minLength,
  required: () => required,
  size: () => size
});
module.exports = __toCommonJS(index_exports);
var import_vue = require("vue");

// src/validators/string.ts
var email = (allowedDomains = [], message) => {
  return (value) => {
    if (!value) return null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return message || "Invalid email format";
    }
    const domain = value.split("@")[1];
    if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {
      return message || "Email domain is not allowed";
    }
    return null;
  };
};
var length = (length2, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length !== length2) {
      return message || `Number of characters required is ${length2}!`;
    }
    return null;
  };
};
var maxLength = (length2, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length > length2) {
      return message || `Maximum length of ${length2} characters required`;
    }
    return null;
  };
};
var minLength = (length2, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length < length2) {
      return message || `Minimum length of ${length2} characters required`;
    }
    return null;
  };
};
var required = (message = "This field is required!") => {
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

// src/validators/file.ts
var extensions = (extensions2, message) => {
  const normalizedExtensions = (Array.isArray(extensions2) ? extensions2 : [extensions2]).map((ext) => ext.toLowerCase().replace(/^\./, ""));
  return (value) => {
    if (!value) return null;
    if (!(value instanceof File)) return null;
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return null;
  };
};
var maxSize = (size2, message) => {
  return (value) => {
    if (!value) return null;
    if (!(value instanceof File)) return null;
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > size2) {
      return message || `Maximum file size of ${size2} MB exceeded.`;
    }
    return null;
  };
};
var size = (length2, message) => {
  return (value) => {
    if (!value) return null;
    return null;
  };
};

// src/index.ts
var VueSanity = class {
  // private fields
  _model;
  _cleanModel;
  // Public fields
  errors = {};
  isValid = false;
  normalizedModel = (0, import_vue.ref)({});
  formData = new FormData();
  // Constructor
  constructor(modelConfig, cleanModel = true) {
    this._model = (0, import_vue.reactive)(modelConfig);
    this._cleanModel = cleanModel;
    this._validate();
  }
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
  _clearModelErrors = () => {
    Object.entries(this._model).forEach(([key, field]) => {
      field.errors = [];
    });
  };
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
  _deconstructor = () => {
    if (!this._model) return;
    if (this._cleanModel && this.isValid) this._clearModelValues();
    this._clearModelErrors();
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  email,
  extensions,
  length,
  maxLength,
  maxSize,
  minLength,
  required,
  size
});
