import { reactive, ref, type Reactive } from "vue";
import type { ModelConfig, ValidationRule } from "./types";

export { ModelConfig };
export {
  email,
  minLength,
  maxLength,
  required,
  length,
  sameAs
} from "./validators/string";
export { maxSize, extensions, size } from "./validators/file";

/**
 * VueSanity class for handling complex form models with validation and normalization.
 * @param modelConfig - The configuration object for the form model.
 * @param cleanAfter - Whether to clean the model successful validations. Default is true.
 */
export default class VueSanity {
  // private fields
  private _model: ModelConfig;
  private _cleanAfter: boolean;
  // Public fields
  public errors: Record<string, string[]> = {};
  public isValid: boolean = false;
  public normalizedModel: Reactive<Object> = ref({});
  public formData: FormData = new FormData();

  // Constructor
  constructor(modelConfig: ModelConfig, cleanAfter: boolean = true) {
    // Initialize the validated model with dirty and errors properties
    this._model = reactive(modelConfig);
    this._cleanAfter = cleanAfter;

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
    if (this._cleanAfter && this.isValid) this._clearModelValues();
    // Clear the errors if they exist
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

  static getFormData(object: Record<string, any>) {
    const formData = new FormData();

    function processValue(value: any) {
      // Handle reactive values with .value property (refs)
      if (value && typeof value === "object" && "value" in value) {
        return value.value;
      }
      return value;
    }

    function appendToFormData(obj: any, prefix = "") {
      if (obj === null || obj === undefined) {
        return;
      }

      // Handle unwrapping of reactive values
      obj = processValue(obj);

      if (obj instanceof File) {
        formData.append(prefix, obj);
      } else if (Array.isArray(obj)) {
        // Handle arrays of files specifically
        if (obj.length > 0 && obj[0] instanceof File) {
          obj.forEach((file) => {
            formData.append(`${prefix}`, file);
          });
        } else {
          // Handle other array types
          obj.forEach((item, index) => {
            appendToFormData(item, `${prefix}[${index}]`);
          });
        }
      } else if (
        typeof obj === "object" &&
        !(obj instanceof File) &&
        !(obj instanceof Blob) &&
        !(obj instanceof Date)
      ) {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          const newPrefix = prefix ? `${prefix}[${key}]` : key;
          appendToFormData(value, newPrefix);
        });
      } else if (obj instanceof Date) {
        formData.append(prefix, obj.toISOString());
      } else if (obj !== undefined) {
        formData.append(prefix, String(obj));
      }
    }

    appendToFormData(object);
    return formData;
  }
}
