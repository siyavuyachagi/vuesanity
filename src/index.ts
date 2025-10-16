// src/index.ts (Main entry point)
export { default as VueSanity } from './core/vuesanity';
export { getFormData } from './core/form-data.helper';

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
    extensions,
    maxSize,
    minSize,
    size,
    image,
} from './validators/file/index';

// Number Validators
export {
    min,
    max,
    range,
} from './validators/number/index';

// Date Validators
export {
    minDate,
    maxDate,
    dateRange,
} from './validators/date/index';

// Types
export * from './types/index';