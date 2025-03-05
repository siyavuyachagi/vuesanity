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
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_vue = require("vue");
var VueSanity = class {
  _model = (0, import_vue.ref)(null);
  _isLive = (0, import_vue.ref)(false);
  isValid = (0, import_vue.ref)(false);
  formData;
  normalizedModel = (0, import_vue.reactive)({});
  errors = {};
  /**
   * Creates an instance of VueSanity.
   *
   * @param {object} model - The Vue model object to be validated.
   * @param {boolean} [live=false] - Optional flag to enable live validation.
   */
  constructor(model, live = false) {
    try {
      if (!model || typeof model !== "object") {
        throw new Error("Invalid model provided");
      }
      this._isLive.value = live;
      this._model.value = model;
      this.formData = new FormData();
      this._initialize();
    } catch (error) {
      console.error("VueSanity Initialization Error:", error);
    }
  }
  /**
   * Initializes the VueSanity instance by processing the model.
   * This method is used to set up initial values and normalize data.
   *
   * @private
   */
  _initialize() {
    this._defaultState();
    this._validate();
    console.log("Initializing VueSanity...");
  }
  /**
   *
   * @private
   */
  _defaultState() {
    Object.entries(this._model).forEach(([key, field]) => {
      field.errors = [];
    });
    this.errors = {};
  }
  /**
   *
   * @private
   */
  _validate() {
    let isValid = true;
    Object.entries(this._model).forEach(([key, field]) => {
      if (field.validations) {
        field.validations.forEach((validation) => {
          const error = validation(field.value);
          if (error) {
            const keyErrors = this.errors[key] || [];
            keyErrors.push(error);
            this.errors[key] = keyErrors;
            field.errors.push(error);
            isValid = false;
          }
        });
      }
    });
  }
};
var index_default = VueSanity;
