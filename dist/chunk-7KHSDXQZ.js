import {
  getFormData
} from "./chunk-O5JMOZWE.js";

// src/core/vuesanity.ts
import { reactive, ref } from "vue";
var VueSanity = class {
  // private fields
  _model;
  _cleanValues;
  // Public fields
  errors = {};
  isValid = false;
  normalizedModel = ref({});
  formData = new FormData();
  // Static method to convert object to FormData: Accessible via VueSanity.getFormData()
  static getFormData = getFormData;
  // Constructor
  constructor(modelConfig, cleanValues = true) {
    this._model = reactive(modelConfig);
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

export {
  VueSanity
};
