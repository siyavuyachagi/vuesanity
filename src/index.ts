import { reactive, ref, type Reactive } from "vue";
import type { ModelConfig, ValidationRule } from "./types";

export {
  email,
  minLength,
  maxLength,
  required,
  length,
} from "./validators/string";
export { maxSize, extensions, size } from "./validators/file";

/**
 * VueSanity class for handling complex form models with validation and normalization.
 * @param modelConfig - The configuration object for the form model.
 * @param cleanModel - Whether to clean the model before performing validation. Default is true.
 */
export default class VueSanity {
  // private fields
  private _model: ModelConfig;
  private _cleanModel: boolean;
  // Public fields
  public errors: Record<string, string[]> = {};
  public isValid: boolean = false;
  public normalizedModel: Reactive<Object> = ref({});
  public formData: FormData = new FormData();

  // Constructor
  constructor(modelConfig: ModelConfig, cleanModel: boolean = true) {
    // Initialize the validated model with dirty and errors properties
    this._model = reactive(modelConfig);
    this._cleanModel = cleanModel;

    // Perform initial validation
    this._validate();
  }

  private _validate() {
    let isValid = true;
    this._clearModelErrors();

    // Validate each field in the model
    Object.entries(this._model).forEach(([key, field]) => {
      if (field.validations) {
        field.validations.forEach((validation: ValidationRule) => {
          // Check for an array values
          const fieldErrors: string[] = [];
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

          // Add error to errors(_this.errors) prop with its associated key
          // Before pushing errors, ensure the array exists for that key
          if (fieldErrors.length > 0 && !this.errors[key]) {
            this.errors[key] = [];
            this.errors[key].push(...fieldErrors);
          }

          // Add error the model's(_this.model) field or prop
          if (fieldErrors.length > 0) {
            field.errors!.push(...fieldErrors);
            isValid = false;
          }
        });
      }
    });

    this.isValid = isValid;

    // If the form is valid, generate the payload
    if (!isValid) {
      this.normalizedModel = {};
    } else {
      // Generate payload
      this.normalizedModel = Object.entries(this._model).reduce(
        (acc, [key, field]) => {
          // Only add the field to the payload if it's valid
          if (!field.errors || field.errors.length === 0) {
            acc[key] = field.value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      // Generate formData
      Object.entries(this._model).forEach(([key, field]) => {
        if (Array.isArray(field.value)) {
          Array.from(field.value).forEach((value) => {
            if (value) this.formData.append(key, value);
          });
        } else {
          if (field.value) this.formData.append(key, field.value);
        }
      });

      this._deconstructor(); // ✅ Clean up
    }
  }

  private _clearModelErrors = () => {
    // Clean model errors
    Object.entries(this._model).forEach(([key, field]) => {
      field.errors = [];
    });
  };

  private _clearModelValues = () => {
    // Loop through each field in the model
    Object.keys(this._model).forEach((field) => {
      if (this._model[field]) {
        // Clear the value if it exists
        if (this._model[field].value !== undefined) {
          // Check if the value is an array
          if (Array.isArray(this._model[field].value))
            Array.from(this._model[field].value).splice(0);
          // this._model[field].value = [];
          else this._model[field].value = null;
        }
      }
    });
  };

  private _deconstructor = () => {
    if (!this._model) return;
    if (this._cleanModel && this.isValid) this._clearModelValues();
    // Clear the errors if they exist
    this._clearModelErrors();
  };
}
