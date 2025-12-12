# VueSanity - Quick Reference Guide

## 🎯 All Validators at a Glance

### Boolean Validators
```typescript
requireTrue()                         // Before date
requireFalse()             // After date
```

### Date Validators
```typescript
maxDate(new Date())                         // Before date
minDate(new Date('2024-01-01'))             // After date
rangeDate(min, max)                         // Between dates
```

### String Validators
```typescript
alpha(true)                           // Letters only
alphanumeric(false)                   // Letters + numbers
chars(10)                             // Exact length
email()                               // Valid email
maxChars(50)                          // Max length
minChars(8)                           // Min length
numeric(true, false)                  // Numbers only, allow (decimals, negative)
phone()                               // E.164 format
regex(/^[A-Z]{3}\d{3}$/)              // Custom pattern
required()                            // Not empty
sameAs(() => pwd.value)               // Compare values
url()                                 // Valid URL
```

### File Validators
```typescript
fileExtensions(['pdf', 'doc'])                  // File type
fileSize(2)                                     // Exactly 2MB
fileType("image/png", "Invalid file type")      // Image file
maxFileSize(5)                                  // Max 5MB
minFileSize(0.1)                                // Min 0.1MB
```

### Number Validators
```typescript
maxNumber(100)                        // <= 100
minNumber(0)                          // >= 0
rangeNumber(1, 100)                   // Between 1-100
```

---

## 🚀 Quick Start

### Installation
```bash
npm install @siyavuyachagi/vuesanity
```

### Basic Form
```typescript
import { reactive } from 'vue';
import VueSanity, { required, email, minChars } from '@siyavuyachagi/vuesanity';
import type ModelConfig from '@siyavuyachagi/vuesanity/types'

const form: ModelConfig = reactive({
  email: { value: '', validations: [required(), email()], errors: [] },
  password: { value: '', validations: [required(), minChars(8)], errors: [] }
});

const validator = new VueSanity(form);

console.log(validator.isValid);           // true/false
console.log(validator.errors);            // { email: [...], password: [...] }
console.log(validator.normalizedModel);   // { email: '...', password: '...' }
console.log(validator.formData);          // FormData object
```

---

## 📥 Import Patterns

### All Validators (Main Entry)
```typescript
import VueSanity, {
  required, email, minChars,
  maxFileSize, fileExtensions,
  minNumber, maxNumber, rangeNumber,
  minDate, maxDate
} from '@siyavuyachagi/vuesanity';
```

### By Category
```typescript
// Strings only
import { required, email, minChars } from '@siyavuyachagi/vuesanity/validators/string';

// Files only
import { maxSize, extensions } from '@siyavuyachagi/vuesanity/validators/file';

// Numbers only
import { min, max, range } from '@siyavuyachagi/vuesanity/validators/number';

// Dates only
import { minDate, maxDate } from '@siyavuyachagi/vuesanity/validators/date';
```

### Types
```typescript
import type { ModelConfig, FieldConfig, ValidationRule } from '@siyavuyachagi/vuesanity';
```

---

## 💾 FormData Usage

### Automatic Generation
```typescript
const validator = new VueSanity(form);
if (validator.isValid) {
  // FormData ready to go
  const formData = validator.formData;
  
  await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}
```

### Manual Generation
```typescript
import VueSanity from '@siyavuyachagi/vuesanity';

const data = {
  name: 'John',
  age: 25,
  file: fileObject
};

const formData = VueSanity.getFormData(data);
```

---

## 🛠️ Build Commands

```bash
# Install dependencies
npm install

# Build project
npm run build

# Build with watch
npm run build -- --watch

# Link locally for testing
npm link

# Unlink
npm unlink

# Publish to npm
npm publish
```

---

## 🧪 Testing Patterns

### Test Valid Form
```typescript
const form = { email: { value: 'test@example.com', validations: [email()], errors: [] } };
const v = new VueSanity(form);
expect(v.isValid).toBe(true);
expect(v.errors.email).toBeUndefined();
```

### Test Invalid Form
```typescript
const form = { email: { value: 'invalid', validations: [email()], errors: [] } };
const v = new VueSanity(form);
expect(v.isValid).toBe(false);
expect(v.errors.email).toBeDefined();
```

### Test FormData
```typescript
const form = {
  name: { value: 'John', validations: [required()], errors: [] },
  file: { value: fileObj, validations: [required()], errors: [] }
};
const v = new VueSanity(form);
expect(v.formData.get('name')).toBe('John');
expect(v.formData.get('file')).toBe(fileObj);
```

---

## ⚡ Performance Tips

1. **Validate on Submission** - Not on every keystroke
2. **Import by Category** - Better tree-shaking
3. **Use FormData** - Built-in optimization
4. **Create Once** - Reuse validator instances
5. **Lazy Load** - Code-split validator categories

---

## 🐛 Troubleshooting

### Issue: Imports not working
```bash
# Ensure build is run
npm run build

# Check dist/ folder exists
ls -la dist/

# Verify exports
cat dist/index.d.ts
```

### Issue: TypeScript errors
```typescript
// Ensure types are imported
import type ModelConfig from '@siyavuyachagi/vuesanity/types';

// Use proper typing
const form: ModelConfig = reactive({...});
```

### Issue: Validation not working
```typescript
// Ensure errors array is initialized
{
  email: {
    value: '',
    validations: [...],
    errors: []  // ← Required!
  }
}

// Re-create validator if form changes
const validator = new VueSanity(myForm);
```

---

## 📚 Documentation Links

- **README**: Intro and quick reference
- **Usage Guide**: Complete guide with examples
- **API Reference**: All validators documented
- **Internal Rules**: Code standards and conventions
- **GitHub**: https://github.com/siyavuyachagi/vuesanity

---

## 🎯 Common Use Cases

### Login Form
```typescript
const loginForm: ModelConfig = reactive({
  email: { value: '', validations: [required(), email()], errors: [] },
  password: { value: '', validations: [required(), minChars(8)], errors: [] }
});
```

### Registration Form
```typescript
const regForm: ModelConfig = reactive({
  firstName: { value: '', validations: [required(), alpha(true)], errors: [] },
  email: { value: '', validations: [required(), email()], errors: [] },
  age: { value: null, validations: [required(), min(18), max(120)], errors: [] },
  password: { value: '', validations: [required(), minChars(8)], errors: [] },
  confirm: { value: '', validations: [required(), sameAs(() => password)], errors: [] }
});
```

### File Upload
```typescript
const uploadForm: ModelConfig = reactive({
  title: { value: '', validations: [required()], errors: [] },
  file: { value: null, validations: [required(), extensions(['pdf']), maxSize(5)], errors: [] }
});
```

### Survey Form
```typescript
const surveyForm: ModelConfig = reactive({
  birthDate: { value: null, validations: [required(), maxDate(new Date())], errors: [] },
  rating: { value: null, validations: [required(), range(1, 5)], errors: [] },
  website: { value: '', validations: [url()], errors: [] }
});
```

---

## 💡 Pro Tips

1. **Custom Validators** - Create your own following the pattern
2. **Async Validation** - Create wrapper that awaits before validating
3. **Multi-step Forms** - Validate each step separately
4. **Dynamic Fields** - Add/remove validators dynamically
5. **Nested Forms** - Create validators per section
6. **Reset Forms** - Clear all values and errors

---
