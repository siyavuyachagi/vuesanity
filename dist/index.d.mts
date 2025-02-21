import * as vue from 'vue';
export { ModelConfig } from './types/index.mjs';

/**
 * VueSanity is a utility class for handling Vue model validation and real-time updates.
 * It simplifies data handling in Vue applications by providing reactive validation support.
 *
 * @class VueSanity
 */
declare class VueSanity {
    private _model;
    private _isLive;
    isValid: vue.Ref<boolean, boolean>;
    formData: FormData | undefined;
    normalizedModel: Record<string, any>;
    errors: Record<string, string[]>;
    /**
     * Creates an instance of VueSanity.
     *
     * @param {object} model - The Vue model object to be validated.
     * @param {boolean} [live=false] - Optional flag to enable live validation.
     */
    constructor(model: object, live?: boolean);
    /**
     * Initializes the VueSanity instance by processing the model.
     * This method is used to set up initial values and normalize data.
     *
     * @private
     */
    private _initialize;
    /**
     *
     * @private
     */
    private _defaultState;
    /**
     *
     * @private
     */
    private _validate;
}

export { VueSanity as default };
