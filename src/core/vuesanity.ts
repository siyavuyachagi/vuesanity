// ./src/core/vuesanity.class.ts

import { reactive, Reactive, ref } from "vue";
import { ModelConfig, ValidationRule } from "../types";
import { getFormData } from "../helpers/form-data.helper";

/**
 * VueSanity - A form validation and normalization utility for Vue 3.
 * 
 * Handles complex form models with built-in validation, error tracking, and data normalization.
 * Automatically generates clean payloads and FormData objects from validated field values.
 * 
 * @class VueSanity
 * @param {ModelConfig} modelConfig - Configuration object defining form fields with validation rules, initial values, and error tracking
 * @param {boolean} cleanValues - Whether to automatically clear field values after successful validation (default: true)
 * 
 * @example
 * const form = new VueSanity({
 *   email: { value: '', validations: [required, email], errors: [] },
 *   password: { value: '', validations: [required, minChars(8)], errors: [] }
 * });
 * 
 * console.log(form.isValid); // boolean
 * console.log(form.normalizedModel); // validated data object
 * console.log(form.formData); // FormData instance for submission
 * console.log(form.errors); // validation errors by field
 */
export default class VueSanity {
    // private fields
    private _model: ModelConfig;
    private _cleanValues: boolean;
    // Public fields
    public errors: Record<string, string[]> = {};
    public isValid: boolean = false;
    public normalizedModel: Reactive<Object> = ref({});
    public formData: FormData = new FormData();

    // Static method to convert object to FormData: Accessible via VueSanity.getFormData()
    public static getFormData = getFormData;

    // Constructor
    constructor(modelConfig: ModelConfig, cleanValues: boolean = true) {
        // Initialize the model with dirty and errors config object properties
        this._model = reactive(modelConfig);
        this._cleanValues = cleanValues;

        // Perform initial validation
        this._validate();
    }

    /** Main initial validation method */
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

            this._deconstructor(); // Clean up
        }
    }

    /** Clean model errors after validations */
    private _clearModelErrors = () => {
        // Clean model errors
        Object.entries(this._model).forEach(([key, field]) => {
            field.errors = [];
        });
    };

    /** Optionally clean model values after successful validations */
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

    /** Deconstructor */
    private _deconstructor = () => {
        if (!this._model) return;
        if (this._cleanValues && this.isValid) this._clearModelValues();
        // Clear the errors if they exist
        this._clearModelErrors();
    };
}
