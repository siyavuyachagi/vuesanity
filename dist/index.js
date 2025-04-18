import {
  extensions,
  maxSize,
  size
} from "./chunk-56CRCE5B.js";
import {
  email,
  length,
  maxLength,
  minLength,
  required,
  sameAs
} from "./chunk-C3IHFQN4.js";

// src/index.ts
import { reactive, ref } from "vue";
var VueSanity = class {
  // private fields
  _model;
  _cleanAfter;
  // Public fields
  errors = {};
  isValid = false;
  normalizedModel = ref({});
  formData = new FormData();
  // Constructor
  constructor(modelConfig, cleanAfter = true) {
    this._model = reactive(modelConfig);
    this._cleanAfter = cleanAfter;
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
    if (this._cleanAfter && this.isValid) this._clearModelValues();
    this._clearModelErrors();
  };
  /**
   * Converts a JavaScript object into FormData, handling various data types.
   *
   * Features:
   * - Supports primitive values (string, number, boolean).
   * - Handles nested objects and arrays with properly formatted keys.
   * - Supports File, Blob, and Date objects.
   * - Automatically unwraps reactive values (e.g., Vue's ref() objects).
   *
   * @param {Record<string, any>} object - The object to convert into FormData.
   * @returns {FormData} - A FormData instance containing the object's data.
   */
  static getFormData(object) {
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
};
export {
  VueSanity as default,
  email,
  extensions,
  length,
  maxLength,
  maxSize,
  minLength,
  required,
  sameAs,
  size
};
