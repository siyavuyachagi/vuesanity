# VueSanity

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@siyavuyachagi/vuesanity.svg)](https://www.npmjs.com/package/@siyavuyachagi/vuesanity)
[![Sponsor](https://img.shields.io/badge/Sponsor-💖-ff69b4)](https://github.com/sponsors/siyavuyachagi)


A lightweight and flexible Vue3/Nuxtjs validation utility designed to simplify form validation and state management in Vue applications. Built with TypeScript for enhanced type safety and optimal performance.

## Why VueSanity?

Unlike Vuelidate, VueSanity lets you wrap your model with both props and validations in one place — no separate rules objects, no boilerplate, no headaches.
- ✅ All-in-one reactive model + validation
- ✅ Clean, type-safe, and ready for FormData
- ✅ Immediate validation feedback

It’s faster to set up, easier to read, and simpler to maintain, so you can focus on building features, not wiring forms.

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
| `fileExtension(exts, message?)` | Validates file extensions | `fileExtensio(['pdf', 'docx'])` |
| `maxFileSize(sizeMB, message?)` | Validates maximum file size | `maxFileSize(5, 'Max 5MB')` |
| `minFileSize(sizeMB, message?)` | Validates minimum file size | `minFileSize(0.1)` |
| `fileSize(sizeMB, message?)` | Validates exact file size | `fileSize(2)` |
| `fileType(allowedTypes, message?)` | Validates file MIME types | `fileType(["image/png", "image/jpeg"],'Invalid image')` |

### Number Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `minNumber(value, message?)` | Minimum number value | `minNumber(0, 'Must be positive')` |
| `maxNumber(value, message?)` | Maximum number value | `maxNumber(100)` |
| `rangeNumber(min, max, message?)` | Number range validation | `rangeNumber(1, 100)` |

### Date Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `minDate(date, message?)` | Minimum date validation | `minDate(new Date('2024-01-01'))` |
| `maxDate(date, message?)` | Maximum date validation | `maxDate(new Date())` |
| `rangeDate(minDate, maxDate, message?)` | Date range validation | `rangeDate(min, max)` |

## Documentation

For detailed usage instructions and advanced examples, see [/docs/usage.md](./docs/usage.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Chagi Siyavuya (CeeJay) - [@siyavuyachagi](https://github.com/siyavuyachagi)

## 💖 Sponsor VueSanity

VueSanity is an open-source form validation and utility library for Vue/Nuxt — built and maintained by [@siyavuyachagi](https://github.com/siyavuyachagi).

Your sponsorship helps me dedicate more time to improving the library, adding new validators, maintaining documentation, and providing ongoing support.

### ☕ Ways to Support

If VueSanity has saved you time or made your project better, consider sponsoring the work behind it:

- 💖 **GitHub Sponsors:** [Sponsor@siyavuyachagi](https://github.com/sponsors/siyavuyachagi)
- ☕ **Buy Me a Coffee:** [buymeacoffee.com/siyavuyachagi](https://buymeacoffee.com/siyavuyachagi)
- 💸 **PayPal:** [paypal.me/siyavuyachagi](https://paypal.me/siyavuyachagi)
- 🎯 **Patreon:** [patreon.com/siyavuyachagi](https://patreon.com/siyavuyachagi)

Your support directly helps:
- Ongoing maintenance and bug fixes
- Building new validators and utilities
- Writing documentation and tutorials
- Supporting other open-source contributors

---

### 🧠 Why Sponsor?

VueSanity is designed for **clean, reusable, and declarative validation in Vue**.  
If you or your team depend on it, your contribution ensures it continues to evolve sustainably.

Every sponsor, no matter the amount, makes a difference.  
Thank you for supporting open source 💚