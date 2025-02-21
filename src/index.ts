//index.ts

import { reactive, ref } from "vue";
import { ValidationRule } from "./types";
export { ModelConfig } from "./types";
export * from "./validators";

/**
 * VueSanity is a utility class for handling Vue model validation and real-time updates.
 * It simplifies data handling in Vue applications by providing reactive validation support.
 *
 * @class VueSanity
 */
class VueSanity {
  private _model = ref<Record<string, any> | null>(null);
  private _isLive = ref(false);
  public isValid = ref(false);
  public formData: FormData | undefined;
  public normalizedModel = reactive<Record<string, any>>({});
  public errors: Record<string, string[]> = {};

  /**
   * Creates an instance of VueSanity.
   *
   * @param {object} model - The Vue model object to be validated.
   * @param {boolean} [live=false] - Optional flag to enable live validation.
   */
  constructor(model: object, live: boolean = false) {
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
  private _initialize() {
    // Perform initialization logic here
    this._defaultState();

    // The actual validation logic
    this._validate();
    console.log("Initializing VueSanity...");
  }

  /**
   *
   * @private
   */
  private _defaultState() {
    //Clear previous model errors
    Object.entries(this._model).forEach(([key, field]) => {
      field.errors = [];
    });
    //Clean this.errors
    this.errors = {};

    //Create
  }

  /**
   *
   * @private
   */
  private _validate() {
    // Validate each field in the model
    let isValid = true;
    Object.entries(this._model).forEach(([key, field]) => {
      if (field.validations) {
        field.validations.forEach((validation: ValidationRule) => {
          const error = validation(field.value);
          if (error) {
            // Add error to errors(_this.errors) prop with its associated key
            const keyErrors = this.errors[key] || [];
            keyErrors.push(error);
            this.errors[key] = keyErrors;

            // Add error the model's(_this.model) field or prop
            field.errors!.push(error);
            isValid = false;
          }
        });
      }
    });
  }
}

export default VueSanity;
