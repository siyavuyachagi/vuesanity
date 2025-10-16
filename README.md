# VueSanity

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@siyavuyachagi/vuesanity.svg)](https://www.npmjs.com/package/@siyavuyachagi/vuesanity)

A lightweight and flexible Vue 3 validation utility designed to simplify form validation and state management in Vue applications. Built with TypeScript for enhanced type safety and optimal performance.

## Features

- **Type-Safe Validation**: Built entirely with TypeScript for robust type checking and developer experience
- **Reactive Model Management**: Seamlessly integrates with Vue 3's reactivity system
- **Built-in Validators**: Includes common validators for strings, files, and more
- **Real-time Validation**: Provides immediate feedback with detailed error messages
- **FormData Generation**: Automatically converts your validated models into FormData objects for API submissions
- **Custom Validation Rules**: Easily extend with your own validation rules

## Installation

```bash
npm install @siyavuyachagi/vuesanity
```

or

```bash
yarn add @siyavuyachagi/vuesanity
```

## Basic Usage

```typescript
import { reactive } from 'vue';
import VueSanity, { required, email, minLength } from 'vuesanity';
import type { ModelConfig } from 'vuesanity';

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
      minLength(8, 'Password must be at least 8 characters')
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
```

## Available Validators

### String Validators
- `required(message?)` - Ensures field is not empty
- `email(allowedDomains?, message?)` - Validates email format with optional domain restrictions
- `minLength(length, message?)` - Ensures minimum character length
- `maxLength(length, message?)` - Ensures maximum character length
- `length(exactLength, message?)` - Validates exact character length
- `sameAs(compareValue, message?)` - Compares with another field (useful for password confirmation)
- `phone(locale?, message?)` - Validates phone number format

### File Validators
- `maxSize(sizeMB, message?)` - Validates maximum file size in megabytes
- `extensions(allowedExtensions, message?)` - Validates file extensions
- `size(exactSizeMB, message?)` - Validates exact file size

## Advanced Usage

### Working with FormData

```typescript
// The validated form data is automatically available as FormData
const formData = form.formData;

// Or generate FormData from any object
const customFormData = VueSanity.getFormData(myObject);
```

### Custom Validators

```typescript
// Create a custom validator
const isPositiveNumber = (message = 'Must be a positive number') => {
  return (value: any): string | null => {
    if (!value) return null;
    if (typeof value !== 'number' || value <= 0) {
      return message;
    }
    return null;
  };
};

// Use in your model
const productForm = reactive({
  price: {
    value: 0,
    validations: [required(), isPositiveNumber()],
    errors: []
  }
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Chagi Siyavuya (CeeJay)