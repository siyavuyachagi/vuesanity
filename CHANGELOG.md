# Changelog

All notable changes to VueSanity are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-12

### ⚠ Breaking Changes

* Refactored **VueSanity** to use **generic typing** for strongly typed forms
* `createModel<T>` utility added for automatic model type inference
* Validators now integrate with typed model fields
* Internal `_model` and field handling refactored; previous non-generic usage may need updating
* NormalizedModel and formData generation now fully type-safe

### 🎉 Features

* Added `createModel<T>` to automatically infer form fields from DTO interfaces
* VueSanity now works with strongly typed forms:
  ```ts
  interface LoginDto {
      email: string;
      password: string;
      rememberMe: boolean;
  }

  const loginForm = createModel<LoginDto>({
      email: { value: "" },
      password: { value: "" },
      rememberMe: { value: false }
  });

  const form = new VueSanity(loginForm);


## [1.0.4] - 2025-12-11

### 🎉 Features

* Added **`password` string validator**:
  - Enforces minimum length of 6 characters
  - Requires at least one special character
  - Blocks passwords consisting of the same repeated character (case-insensitive)
* Added **`differentFrom` validator**:
  - Ensures a field is not equal to another value
  - Accepts direct values or getter functions

### 🧪 Tests

* Full unit tests for `password` and `differentFrom` validators
* Tests cover edge cases and rule enforcement

### 📚 Documentation

* Updated docs to include new validators
* Added examples for `password` and `differentFrom`
* Ensured TypeScript typings are documented

### ⌛ Maintanance

* Publish workflow update.

### 📝 Notes

* Backward compatible with all existing validators
* No changes to existing string, number, or file validators


## [1.0.3] - 2025-12-11

### 🛠 Fixes & Updates

* **Fixed `ModelConfig` type export issues** across source, distribution, and test files.
* **Updated project scripts** and statistics handling.
* **Published rules** now correctly include commits.
* Minor maintenance updates (`tsconfig.json` and build configuration).

### 📝 Notes

* No functional changes to validators.
* Fully backward compatible.
* Version bump reflects internal improvements and fixes.



## [1.0.2] - 2025-11-19

### 🎉 Release Highlights

**VueSanity v1.0.2 release!** 🚀

We're thrilled to announce our first official stable release with comprehensive form validation for Vuejs and Nuxtjs! With **107 downloads on day one**, the community has already shown amazing support. Thank you!

### ✨ Features

#### String Validators (12)
- `required` - Field validation with custom messages
- `email` - Email format validation with optional domain restrictions
- `minChars` - Minimum character length validation
- `maxChars` - Maximum character length validation
- `chars` - Exact character length validation
- `phone` - E.164 format with country-specific validation (195+ countries)
- `sameAs` - Field comparison (perfect for password confirmation)
- `url` - URL format validation
- `regex` - Custom regex pattern matching
- `alpha` - Alphabetic characters only (with optional spaces)
- `alphanumeric` - Letters and numbers only (with optional spaces)
- `numeric` - Numbers only (with optional decimals and negatives)

#### File Validators (5)
- `fileExtension` - File type validation by extension
- `maxFileSize` - Maximum file size in MB
- `minFileSize` - Minimum file size in MB
- `fileSize` - Exact file size in MB
- `fileType` - MIME type validation

#### Number Validators (3)
- `minNumber` - Minimum numeric value
- `maxNumber` - Maximum numeric value
- `rangeNumber` - Numeric range validation

#### Date Validators (3)
- `minDate` - Minimum date validation
- `maxDate` - Maximum date validation
- `rangeDate` - Date range validation

### 🔧 Core Features

- **Type-Safe Validation** - Full TypeScript support for enhanced developer experience
- **Reactive Model Management** - Seamless Vue 3 reactivity integration
- **Real-time Validation** - Immediate feedback with detailed error messages
- **FormData Generation** - Automatic conversion to FormData for API submissions
- **Custom Rules** - Easy extension with custom validators
- **Zero Dependencies** - Lightweight with Vue 3 as only peer dependency
- **Clean API** - Intuitive, developer-friendly interface

### 📚 Documentation

- ✅ Comprehensive README with quick start
- ✅ Detailed usage guide with 30+ examples
- ✅ Complete validator reference
- ✅ Internal development rules and standards
- ✅ Pre-release quality checklist
- ✅ Quick reference command guide
- ✅ Export structure documentation
- ✅ Getting started guide for new users

### 🧪 Quality

- ✅ 90%+ test coverage
- ✅ Unit tests for all validators
- ✅ Integration tests with real Vue 3 components
- ✅ FormData helper tests
- ✅ Edge case handling
- ✅ TypeScript strict mode enabled

### 📦 Bundle & Performance

- **Files**: 182
- **Bundle Size** (est.): ~657.74 KB (development)
- **Lines of Code**: 11,963
- **Dependencies**: 0 (Vue 3 peer only)
- **Performance**: Optimized for minimal overhead

### 🔄 What's Included

```
Total Validators: 23
├── String Validators: 12
├── File Validators: 5
├── Number Validators: 3
└── Date Validators: 3
```

### 🚀 Getting Started

```bash
npm install @siyavuyachagi/vuesanity
```

```typescript
import { reactive } from 'vue';
import VueSanity, { required, email, minChars } from '@siyavuyachagi/vuesanity';
import type ModelConfig, from '@siyavuyachagi/vuesanity/types';

const form: ModelConfig = reactive({
  email: { value: '', validations: [required(), email()], errors: [] },
  password: { value: '', validations: [required(), minChars(8)], errors: [] }
});

const validator = new VueSanity(form);
console.log(validator.isValid);           // boolean
console.log(validator.normalizedModel);   // clean data object
console.log(validator.formData);          // FormData instance
```

### 💡 Key Highlights

✨ **Developer Experience**
- Intuitive API - minimal learning curve
- Great TypeScript support - full type inference
- Detailed error messages - clear validation feedback
- Flexible configuration - works your way

🎯 **Use Cases**
- Login and registration forms
- Profile editing and settings
- File uploads with validation
- Multi-step forms
- Dynamic form fields
- Complex nested data structures

🔒 **Security & Validation**
- XSS protection through proper validation
- Email domain restrictions
- Phone number validation by country
- File type and size enforcement
- Custom rule support for additional security

### 🙏 Special Thanks

Big thanks to everyone who downloaded and tested VueSanity on day one! Your support and feedback are invaluable as we continue to improve.

### 📝 Notes

- First stable release
- Ready for production use
- Full backward compatibility maintained
- No breaking changes

### 🔗 Links

- [GitHub Repository](https://github.com/siyavuyachagi/vuesanity)
- [npm Package](https://www.npmjs.com/package/@siyavuyachagi/vuesanity)
- [Documentation](https://github.com/siyavuyachagi/vuesanity#readme)
- [Report Issues](https://github.com/siyavuyachagi/vuesanity/issues)

---

## [Unreleased]

### 🚧 Planned Features

- [ ] Async Validators - For server-side validation
- [ ] Internationalization (i18n) - Multi-language support
- [ ] Browser Extensions - Developer tools
- [ ] Performance Monitoring - Built-in analytics

### 🔄 Improvements

- Better error messages
- More built-in validators
- Enhanced documentation
- Community feedback integration

---

<div align="center">

**Made with ❤️ by [Chagi Siyavuyachagi](https://github.com/siyavuyachagi)**

Support VueSanity:  
⭐ [Star on GitHub](https://github.com/siyavuyachagi/vuesanity)  
🐛 [Report Issues](https://github.com/siyavuyachagi/vuesanity/issues)  
💬 [Start Discussions](https://github.com/siyavuyachagi/vuesanity/discussions)  
💖 [Sponsor](https://github.com/sponsors/siyavuyachagi)

</div>
