import { reactive } from "vue";
import { getFormData } from "../helpers/form-data";
/**
 * VueSanity - Form validation & normalization utility for Vue 3.
 *
 * Handles complex form models with built-in validation, error tracking, and data normalization.
 * Automatically generates clean payloads and FormData objects from validated field values.
 *
 * @template T - Shape of the form data object
 *
 * @example
 * ```ts
 * interface LoginDto {
 *   email: string;
 *   password: string;
 *   rememberMe: boolean;
 * }
 *
 * const loginForm = createModel<LoginDto>({
 *   email: { value: "" },
 *   password: { value: "" },
 *   rememberMe: { value: false }
 * });
 *
 * const form = new VueSanity(loginForm);
 * console.log(form.isValid);          // boolean
 * console.log(form.normalizedModel);  // validated payload object
 * console.log(form.formData);         // FormData instance
 * console.log(form.errors);           // validation errors keyed by field
 * ```
 */
class VueSanity {
    /**
     * Constructor
     * @param modelConfig - The strongly-typed form model configuration
     * @param cleanValues - Automatically clear values after successful validation (default: true)
     */
    constructor(modelConfig, cleanValues = true) {
        /** Validation errors keyed by field */
        this.errors = {};
        /** Form validation status */
        this.isValid = false;
        /** Normalized, validated form payload */
        this.normalizedModel = {};
        /** FormData representation of the validated model */
        this.formData = new FormData();
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
            if (!field || !field.validations)
                continue;
            // Initialize errors array if not present
            if (!field.errors) {
                field.errors = [];
            }
            const fieldErrors = [];
            // --- ARRAY CASE ---
            if (Array.isArray(field.value)) {
                // Run validations on the field value
                field.value.forEach((item) => {
                    field.validations.forEach((validator) => {
                        const error = validator(item);
                        if (error)
                            fieldErrors.push(error);
                    });
                });
            }
            // --- NON-ARRAY CASE ---
            else {
                // Run validations on the field value
                field.validations.forEach((validator) => {
                    const error = validator(field.value);
                    if (error)
                        fieldErrors.push(error);
                });
            }
            if (fieldErrors.length > 0) {
                valid = false;
                field.errors.push(...fieldErrors);
                this.errors[key] = [...fieldErrors];
            }
        }
        this.isValid = valid;
        // Normalize data object
        this._normalizeModel();
    }
    /**
     * Normalizes the data model
     */
    _normalizeModel() {
        if (!this.isValid) {
            this.normalizedModel = {};
        }
        else {
            // Build normalized object
            const result = {};
            for (const key in this._model) {
                const field = this._model[key];
                if (field && (!field.errors || field.errors.length === 0) && field.value !== undefined) {
                    result[key] = field.value;
                }
            }
            this.normalizedModel = result;
            // Build FormData
            this.formData = new FormData();
            for (const key in this._model) {
                const field = this._model[key];
                if (!field)
                    continue;
                const values = this._toArray(field.value);
                for (const val of values) {
                    if (val !== null && val !== undefined) {
                        this.formData.append(key, val);
                    }
                }
            }
            this._deconstructor();
        }
    }
    _toArray(val) {
        if (val === undefined || val === null)
            return [];
        return Array.isArray(val) ? val : [val];
    }
    /** Reset all model field errors */
    _clearModelErrors() {
        for (const key in this._model) {
            const field = this._model[key];
            if (field)
                field.errors = [];
        }
        this.errors = {};
    }
    /** Optionally clear all model field values */
    _clearModelValues() {
        for (const key in this._model) {
            const field = this._model[key];
            if (!field)
                continue;
            if (field.value !== undefined) {
                if (Array.isArray(field.value)) {
                    field.value.splice(0);
                }
                else {
                    field.value = undefined;
                }
            }
        }
    }
    /** Clean-up method called after successful validation */
    _deconstructor() {
        if (!this._model)
            return;
        if (this._cleanValues && this.isValid)
            this._clearModelValues();
        this._clearModelErrors();
    }
}
/** Static helper to convert object to FormData */
VueSanity.getFormData = getFormData;
export default VueSanity;
