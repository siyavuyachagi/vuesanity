import "./chunk-FXPGR372.js";
import "./chunk-ZAQ2JEOY.js";

// src/index.ts
import { reactive, ref } from "vue";
var VueSanity = class {
  _model = ref(null);
  _isLive = ref(false);
  isValid = ref(false);
  formData;
  normalizedModel = reactive({});
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
export {
  index_default as default
};
