# VueSanity

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@siyavuyachagi/vuesanity.svg)](https://www.npmjs.com/package/@siyavuyachagi/vuesanity)

A lightweight and flexible Vue 3 validation utility designed to simplify form validation and state management in Vue applications. Built with TypeScript for enhanced type safety and optimal performance.

## Features

- **Type-Safe Validation**: Built entirely with TypeScript for robust type checking and developer experience
- **Reactive Model Management**: Seamlessly integrates with Vue 3's reactivity system
- **Comprehensive Validators**: 30+ built-in validators for strings, files, numbers, and dates
- **Real-time Validation**: Provides immediate feedback with detailed error messages
- **FormData Generation**: Automatically converts your validated models into FormData objects for API submissions
- **Custom Validation Rules**: Easily extend with your own validation rules
- **Zero Dependencies**: Lightweight library with Vue 3 as the only peer dependency

## Installation

```bash
npm install @siyavuyachagi/vuesanity
```

or

```bash
yarn add @siyavuyachagi/vuesanity
```

## Quick Start

```typescript
import { reactive } from 'vue';
import VueSanity, { required, email, minChars } from '@siyavuyachagi/vuesanity';
import type { ModelConfig } from '@siyavuyachagi/vuesanity';

// Define your form model with validation rules
const userForm: ModelConfig = reactive({
  email: {
    value: '',
    validations: [
      required('Email is required'),
      email()
    ],
    errors: []
  },
  password: {
    value: '',
    validations: [
      required('Password is required'),
      minChars(8, 'Password must be at least 8 characters')
    ],
    errors: []
  }
});

// Create a VueSanity instance
const form = new VueSanity(userForm);

// Access validation state
console.log(form.isValid); // boolean indicating if the entire form is valid
console.log(form.errors); // Object containing all validation errors
console.log(form.normalizedModel); // Clean data object ready for submission
console.log(form.formData); // FormData instance for file uploads
```

## Available Validators

### String Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `required(message?)` | Ensures field is not empty | `required('Field required')` |
| `email(domains?, message?)` | Validates email format with optional domain restrictions | `email(['gmail.com'], 'Invalid email')` |
| `minChars(length, message?)` | Ensures minimum character length | `minChars(8, 'Min 8 chars')` |
| `maxChars(length, message?)` | Ensures maximum character length | `maxChars(50, 'Max 50 chars')` |
| `chars(length, message?)` | Validates exact character length | `chars(10, 'Exactly 10 chars')` |
| `phone(locale?, message?)` | Validates phone number format (E.164) | `phone('ZA', 'Invalid phone')` |
| `sameAs(compareValue, message?)` | Compares with another field | `sameAs(() => form.password.value)` |
| `url(message?)` | Validates URL format | `url('Invalid URL')` |
| `regex(pattern, message?)` | Custom regex validation | `regex(/^[A-Z]{3}\d{3}$/)` |
| `alpha(allowSpaces?, message?)` | Alphabetic characters only | `alpha(true, 'Letters only')` |
| `alphanumeric(allowSpaces?, message?)` | Letters and numbers only | `alphanumeric()` |
| `numeric(allowDecimals?, allowNegative?, message?)` | Numbers only | `numeric(true, false)` |

### File Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `extensions(exts, message?)` | Validates file extensions | `extensions(['pdf', 'docx'])` |
| `maxSize(sizeMB, message?)` | Validates maximum file size | `maxSize(5, 'Max 5MB')` |
| `minSize(sizeMB, message?)` | Validates minimum file size | `minSize(0.1)` |
| `size(sizeMB, message?)` | Validates exact file size | `size(2)` |
| `image(message?)` | Validates image file format | `image('Invalid image')` |

### Number Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `min(value, message?)` | Minimum number value | `min(0, 'Must be positive')` |
| `max(value, message?)` | Maximum number value | `max(100)` |
| `range(min, max, message?)` | Number range validation | `range(1, 100)` |

### Date Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `minDate(date, message?)` | Minimum date validation | `minDate(new Date('2024-01-01'))` |
| `maxDate(date, message?)` | Maximum date validation | `maxDate(new Date())` |
| `dateRange(minDate, maxDate, message?)` | Date range validation | `dateRange(min, max)` |

## Documentation

For detailed usage instructions and advanced examples, see [/docs/usage.md](./docs/usage.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Chagi Siyavuya (CeeJay) - [@siyavuyachagi](https://github.com/siyavuyachagi)