import { Reactive } from 'vue';
import { ModelConfig } from '../types/model.js';
import { getFormData } from './form-data.helper.js';
import '../types/field.js';
import '../types/rule.js';

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
declare class VueSanity {
    private _model;
    private _cleanValues;
    errors: Record<string, string[]>;
    isValid: boolean;
    normalizedModel: Reactive<Object>;
    formData: FormData;
    static getFormData: typeof getFormData;
    constructor(modelConfig: ModelConfig, cleanValues?: boolean);
    /** Main initial validation method */
    private _validate;
    /** Clean model errors after validations */
    private _clearModelErrors;
    /** Optionally clean model values after successful validations */
    private _clearModelValues;
    /** Deconstructor */
    private _deconstructor;
}

export { VueSanity as default };
