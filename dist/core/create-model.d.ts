import { FieldConfig } from '../types/field-config.js';
import { ModelConfig } from '../types/model-config.js';
import '../types/validation-rule.js';

declare function createModel<T extends Record<string, any>>(fields: Partial<{
    [P in keyof T]: Partial<FieldConfig<T[P]>>;
}>): ModelConfig<T>;

export { createModel };
