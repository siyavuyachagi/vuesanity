import { reactive, UnwrapRef } from "vue";
import { ModelConfig, ValidationRule } from "../types";
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
export default class VueSanity<T extends Record<string, any>> {
    /** Reactive model configuration */
    private _model: ModelConfig<T>;

    /** Should form values be cleared after successful validation */
    private _cleanValues: boolean;

    /** Validation errors keyed by field */
    public errors: Partial<Record<keyof T, string[]>> = {};

    /** Form validation status */
    public isValid: boolean = false;

    /** Normalized, validated form payload */
    public normalizedModel: UnwrapRef<T> = {} as UnwrapRef<T>;

    /** FormData representation of the validated model */
    public formData: FormData = new FormData();

    /** Static helper to convert object to FormData */
    public static getFormData = getFormData;

    /**
     * Constructor
     * @param modelConfig - The strongly-typed form model configuration
     * @param cleanValues - Automatically clear values after successful validation (default: true)
     */
    constructor(modelConfig: ModelConfig<T>, cleanValues: boolean = true) {
        this._model = reactive(modelConfig) as ModelConfig<T>;
        this._cleanValues = cleanValues;

        this._validate();
    }

    /** Perform validations for all fields and update state */
    private _validate() {
        let valid = true;
        this._clearModelErrors();

        for (const key in this._model) {
            const field = this._model[key];

            if (!field || !field.validations) continue;

            // Initialize errors array if not present
            if (!field.errors) {
                field.errors = [];
            }

            const fieldErrors: string[] = [];

            // --- ARRAY CASE ---
            if (Array.isArray(field.value)) {
                // Run validations on the field value
                field.value.forEach((item: any) => {
                    field.validations!.forEach((validator: ValidationRule) => {
                        const error = validator(item);
                        if (error) fieldErrors.push(error);
                    });
                });
            }
            
            // --- NON-ARRAY CASE ---
            else {
                // Run validations on the field value
                field.validations!.forEach((validator: ValidationRule) => {
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

        // Normalize data object
        this._normalizeModel();
    }

    /**
     * Normalizes the data model
     */
    private _normalizeModel() {
        if (!this.isValid) {
            this.normalizedModel = {} as UnwrapRef<T>;
        } else {
            // Build normalized object
            const result: any = {};
            for (const key in this._model) {
                const field = this._model[key];
                if (field && (!field.errors || field.errors.length === 0) && field.value !== undefined) {
                    result[key] = field.value;
                }
            }
            this.normalizedModel = result as UnwrapRef<T>;

            // Build FormData
            this.formData = new FormData();
            for (const key in this._model) {
                const field = this._model[key];
                if (!field) continue;
                
                const values = this._toArray(field.value);
                for (const val of values) {
                    if (val !== null && val !== undefined) {
                        this.formData.append(key, val as any);
                    }
                }
            }

            this._deconstructor();
        }
    }


    private _toArray<Value>(val: Value | Value[] | undefined): Value[] {
        if (val === undefined || val === null) return [];
        return Array.isArray(val) ? val : [val];
    }


    /** Reset all model field errors */
    private _clearModelErrors() {
        for (const key in this._model) {
            const field = this._model[key];
            if (field) field.errors = [];
        }
        this.errors = {};
    }

    /** Optionally clear all model field values */
    private _clearModelValues() {
        for (const key in this._model) {
            const field = this._model[key];
            if (!field) continue;

            if (field.value !== undefined) {
                if (Array.isArray(field.value)) {
                    field.value.splice(0);
                } else {
                    field.value = undefined as any;
                }
            }
        }
    }

    /** Clean-up method called after successful validation */
    private _deconstructor() {
        if (!this._model) return;
        if (this._cleanValues && this.isValid) this._clearModelValues();
        this._clearModelErrors();
    }
}