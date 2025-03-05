import { Reactive } from 'vue';
import { ModelConfig } from './types/index.js';
export { email, length, maxLength, minLength, required } from './validators/string.js';
export { extensions, maxSize, size } from './validators/file.js';

/**
 * VueSanity class for handling complex form models with validation and normalization.
 * @param modelConfig - The configuration object for the form model.
 * @param cleanModel - Whether to clean the model before performing validation. Default is true.
 */
declare class VueSanity {
    private _model;
    private _cleanModel;
    errors: Record<string, string[]>;
    isValid: boolean;
    normalizedModel: Reactive<Object>;
    formData: FormData;
    constructor(modelConfig: ModelConfig, cleanModel?: boolean);
    private _validate;
    private _clearModelErrors;
    private _clearModelValues;
    private _deconstructor;
}

export { ModelConfig, VueSanity as default };
