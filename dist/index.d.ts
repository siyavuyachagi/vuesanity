import { Reactive } from 'vue';
import { ModelConfig } from './types/index.js';
export { email, length, maxLength, minLength, required } from './validators/string.js';
export { extensions, maxSize, size } from './validators/file.js';

/**
 * VueSanity class for handling complex form models with validation and normalization.
 * @param modelConfig - The configuration object for the form model.
 * @param cleanAfter - Whether to clean the model successful validations. Default is true.
 */
declare class VueSanity {
    private _model;
    private _cleanAfter;
    errors: Record<string, string[]>;
    isValid: boolean;
    normalizedModel: Reactive<Object>;
    formData: FormData;
    constructor(modelConfig: ModelConfig, cleanAfter?: boolean);
    private _validate;
    private _clearModelErrors;
    private _clearModelValues;
    private _deconstructor;
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
    static getFormData(object: Record<string, any>): FormData;
}

export { ModelConfig, VueSanity as default };
