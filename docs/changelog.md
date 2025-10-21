# Changelog

All notable changes to VueSanity will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-01-15

### 🎉 Release Highlights

**VueSanity v1.0.1 is live!** 🚀

We're thrilled to announce our first stable release with comprehensive form validation for Vue 3! With **107 downloads on day one**, the community has already shown amazing support. Thank you!

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

- **Bundle Size** (est.): ~657.30 KB (development)
- **Lines of Code**: 11,959
- **Files**: 182
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

const form = reactive({
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
- [ ] Custom Error Formatting - Flexible error messages
- [ ] Internationalization (i18n) - Multi-language support
- [ ] Browser Extensions - Developer tools
- [ ] Performance Monitoring - Built-in analytics

### 🔄 Improvements

- Better error messages
- More built-in validators
- Enhanced documentation
- Community feedback integration

---

## Version History

| Version | Date | Status | Downloads (Day 1) |
|---------|------|--------|-------------------|
| 1.0.1 | 2025-01-15 | ✅ Current | 107+ |

---

**Made with ❤️ by [Chagi Siyavuya](https://github.com/siyavuyachagi)**

Support VueSanity:
- ⭐ [Star on GitHub](https://github.com/siyavuyachagi/vuesanity)
- 🐛 [Report Issues](https://github.com/siyavuyachagi/vuesanity/issues)
- 💬 [Start Discussions](https://github.com/siyavuyachagi/vuesanity/discussions)
- 💖 [Sponsor](https://github.com/sponsors/siyavuyachagi)