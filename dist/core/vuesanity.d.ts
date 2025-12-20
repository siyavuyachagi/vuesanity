import { UnwrapRef } from "vue";
import { ModelConfig } from "../types";
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
    private _model;
    /** Should form values be cleared after successful validation */
    private _cleanValues;
    /** Validation errors keyed by field */
    errors: Partial<Record<keyof T, string[]>>;
    /** Form validation status */
    isValid: boolean;
    /** Normalized, validated form payload */
    normalizedModel: UnwrapRef<T>;
    /** FormData representation of the validated model */
    formData: FormData;
    /** Static helper to convert object to FormData */
    static getFormData: typeof getFormData;
    /**
     * Constructor
     * @param modelConfig - The strongly-typed form model configuration
     * @param cleanValues - Automatically clear values after successful validation (default: true)
     */
    constructor(modelConfig: ModelConfig<T>, cleanValues?: boolean);
    /** Perform validations for all fields and update state */
    private _validate;
    /**
     * Normalizes the data model
     */
    private _normalizeModel;
    private _toArray;
    /** Reset all model field errors */
    private _clearModelErrors;
    /** Optionally clear all model field values */
    private _clearModelValues;
    /** Clean-up method called after successful validation */
    private _deconstructor;
}
