// src/index.ts (Main entry point)
export { default as VueSanity } from './core/vuesanity';
export { getFormData } from './helpers/form-data';

// Date Validators
export {
    minDate,
    maxDate,
    rangeDate,
} from './validators/date/index';

// String Validators
export {
    required,
    email,
    minChars,
    maxChars,
    chars,
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


// Types
export * from './types/index';