import {
  getFormData
} from "./chunk-L6NAN44R.js";

// src/core/vuesanity.ts
import { reactive } from "vue";
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
    this._model = reactive(modelConfig);
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
      this.normalizedModel = Object.keys(this._model).reduce((acc, key) => {
        const field = this._model[key];
        if (!field.errors || field.errors.length === 0) {
          acc[key] = field.value;
        }
        return acc;
      }, {});
      this.formData = new FormData();
      for (const key in this._model) {
        const field = this._model[key];
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
      if (Array.isArray(field.value)) {
        field.value.splice(0);
      } else {
        field.value = null;
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

export {
  VueSanity
};
