# VueSanity - Quick Reference Guide

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| Total Validators | 23 |
| String Validators | 12 |
| File Validators | 5 |
| Number Validators | 3 |
| Date Validators | 3 |
| Lines of Code | ~3 666 |
| Number of Files | ~ 177 |
| Bundle Size (est.) | ~137.84 KB |
| Dependencies | 0 (Vue 3 peer only) |

---

## 🎯 All Validators at a Glance

### String Validators
```typescript
required()                                    // Not empty
email()                                       // Valid email
minChars(8)                                  // Min length
maxChars(50)                                 // Max length
chars(10)                                    // Exact length
phone()                                      // E.164 format
sameAs(() => pwd.value)                     // Compare values
url()                                        // Valid URL
regex(/^[A-Z]{3}\d{3}$/)                   // Custom pattern
alpha(true)                                  // Letters only
alphanumeric(false)                         // Letters + numbers
numeric(true, false)                        // Numbers only
```

### File Validators
```typescript
extensions(['pdf', 'doc'])                  // File type
maxSize(5)                                  // Max 5MB
minSize(0.1)                                // Min 0.1MB
size(2)                                     // Exactly 2MB
image()                                     // Image file
```

### Number Validators
```typescript
min(0)                                      // >= 0
max(100)                                    // <= 100
range(1, 100)                               // Between 1-100
```

### Date Validators
```typescript
minDate(new Date('2024-01-01'))            // After date
maxDate(new Date())                         // Before date
dateRange(min, max)                         // Between dates
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

const form = reactive({
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
  maxSize, extensions,
  min, max, range,
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
import type { ModelConfig } from '@siyavuyachagi/vuesanity';

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
const loginForm = reactive({
  email: { value: '', validations: [required(), email()], errors: [] },
  password: { value: '', validations: [required(), minChars(8)], errors: [] }
});
```

### Registration Form
```typescript
const regForm = reactive({
  firstName: { value: '', validations: [required(), alpha(true)], errors: [] },
  email: { value: '', validations: [required(), email()], errors: [] },
  age: { value: null, validations: [required(), min(18), max(120)], errors: [] },
  password: { value: '', validations: [required(), minChars(8)], errors: [] },
  confirm: { value: '', validations: [required(), sameAs(() => password)], errors: [] }
});
```

### File Upload
```typescript
const uploadForm = reactive({
  title: { value: '', validations: [required()], errors: [] },
  file: { value: null, validations: [required(), extensions(['pdf']), maxSize(5)], errors: [] }
});
```

### Survey Form
```typescript
const surveyForm = reactive({
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
