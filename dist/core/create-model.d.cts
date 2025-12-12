import { FieldConfig } from '../types/field-config.cjs';
import { ModelConfig } from '../types/model-config.cjs';
import '../types/validation-rule.cjs';

declare function createModel<T extends Record<string, any>>(fields: Partial<{
    [P in keyof T]: Partial<FieldConfig<T[P]>>;
}>): ModelConfig<T>;

export { createModel };
