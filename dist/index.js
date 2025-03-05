import {
  extensions,
  maxSize,
  size
} from "./chunk-WK7HI5TO.js";
import {
  email,
  length,
  maxLength,
  minLength,
  required
} from "./chunk-ZHURLIZA.js";

// src/index.ts
import { reactive, ref } from "vue";
var VueSanity = class {
  // private fields
  _model;
  _cleanModel;
  // Public fields
  errors = {};
  isValid = false;
  normalizedModel = ref({});
  formData = new FormData();
  // Constructor
  constructor(modelConfig, cleanModel = true) {
    this._model = reactive(modelConfig);
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
export {
  VueSanity as default,
  email,
  extensions,
  length,
  maxLength,
  maxSize,
  minLength,
  required,
  size
};
