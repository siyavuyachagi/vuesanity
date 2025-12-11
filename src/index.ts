// src/index.ts (Main entry point)
export { default } from './core/vuesanity';
export { getFormData } from './helpers/form-data';

// Date Validators
export {
    minDate,
    maxDate,
    rangeDate,
} from './validators/date/index';

// String Validators
export {
    chars,
    differentFrom,
    required,
    email,
    minChars,
    maxChars,
    password,
    phone,
    sameAs,
    url,
    regex,
    alpha,
    alphanumeric,
    numeric,
} from './validators/string/index';

// File Validators
export {
    fileExtension,
    fileSize,
    fileType,
    maxFileSize,
    minFileSize,
} from './validators/file/index';

// Number Validators
export {
    maxNumber,
    minNumber,
    rangeNumber,
} from './validators/number/index';

// Types - Export as types only
export type { default as ModelConfig } from './types/model-config';
export type { FieldConfig } from './types/field';
export type { ValidationRule } from './types/rule';